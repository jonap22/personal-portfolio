'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// THREE.Clock was deprecated in r183; @react-three/fiber 9.x still uses it internally.
// The THREE namespace is exported as getter-only properties (webpack ES module seal),
// so the class cannot be replaced. Narrow-suppress just this one deprecation warning.
if (typeof window !== 'undefined') {
  const _warn = console.warn.bind(console)
  console.warn = (...args: Parameters<typeof console.warn>) => {
    if (typeof args[0] === 'string' && args[0].startsWith('THREE.Clock:')) return
    _warn(...args)
  }
}

const NODE_COUNT = 80
const CONNECT_DIST = 0.72
const MAX_LINES = 160
const BOUNDS = 2.0
const REPEL_RADIUS = 0.65
const REPEL_STRENGTH = 0.0045
const MAX_PULSES = 10

interface Node {
  pos: THREE.Vector3
  vel: THREE.Vector3
}

function NetworkScene({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const pulsePointsRef = useRef<THREE.Points>(null)

  const nodes = useMemo<Node[]>(() =>
    Array.from({ length: NODE_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 1.2,
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.002,
      ),
    })),
  [])

  const nodePosBuf = useMemo(() => new Float32Array(NODE_COUNT * 3), [])
  const lineBuf = useMemo(() => new Float32Array(MAX_LINES * 6), [])
  const pulseBuf = useMemo(() => new Float32Array(MAX_PULSES * 3), [])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(lineBuf, 3))
    return g
  }, [lineBuf])

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(nodePosBuf, 3))
    return g
  }, [nodePosBuf])

  const pulseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pulseBuf, 3))
    return g
  }, [pulseBuf])

  const pulses = useRef<Array<{ from: number; to: number; t: number; speed: number }>>([])
  const pulseTimer = useRef(0)
  const mouse3D = useMemo(() => new THREE.Vector3(), [])
  const scaleTarget = useMemo(() => new THREE.Vector3(1, 1, 1), [])
  const connected = useRef<[number, number][]>([])

  useFrame((_, delta) => {
    if (!groupRef.current || !pointsRef.current || !linesRef.current || !pulsePointsRef.current)
      return

    const dt = Math.min(delta, 0.05)

    mouse3D.set(
      mouseRef.current.x * BOUNDS * 1.3,
      mouseRef.current.y * BOUNDS * 1.3,
      0,
    )

    // Update nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i]

      // Mouse repulsion
      const dx = n.pos.x - mouse3D.x
      const dy = n.pos.y - mouse3D.y
      const dist2 = dx * dx + dy * dy
      if (dist2 < REPEL_RADIUS * REPEL_RADIUS && dist2 > 0.0001) {
        const dist = Math.sqrt(dist2)
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
        n.vel.x += (dx / dist) * force
        n.vel.y += (dy / dist) * force
      }

      n.vel.multiplyScalar(0.995)
      n.pos.x += n.vel.x * dt * 60
      n.pos.y += n.vel.y * dt * 60
      n.pos.z += n.vel.z * dt * 60

      // Soft boundary
      const bx = BOUNDS, by = BOUNDS, bz = BOUNDS * 0.65
      if (Math.abs(n.pos.x) > bx) { n.vel.x *= -0.8; n.pos.x = Math.sign(n.pos.x) * bx }
      if (Math.abs(n.pos.y) > by) { n.vel.y *= -0.8; n.pos.y = Math.sign(n.pos.y) * by }
      if (Math.abs(n.pos.z) > bz) { n.vel.z *= -0.8; n.pos.z = Math.sign(n.pos.z) * bz }

      nodePosBuf[i * 3] = n.pos.x
      nodePosBuf[i * 3 + 1] = n.pos.y
      nodePosBuf[i * 3 + 2] = n.pos.z
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Update edges
    let lineCount = 0
    connected.current = []
    for (let i = 0; i < NODE_COUNT && lineCount < MAX_LINES; i++) {
      for (let j = i + 1; j < NODE_COUNT && lineCount < MAX_LINES; j++) {
        const dx = nodes[i].pos.x - nodes[j].pos.x
        const dy = nodes[i].pos.y - nodes[j].pos.y
        const dz = nodes[i].pos.z - nodes[j].pos.z
        if (dx * dx + dy * dy + dz * dz < CONNECT_DIST * CONNECT_DIST) {
          connected.current.push([i, j])
          const b = lineCount * 6
          lineBuf[b]     = nodes[i].pos.x; lineBuf[b + 1] = nodes[i].pos.y; lineBuf[b + 2] = nodes[i].pos.z
          lineBuf[b + 3] = nodes[j].pos.x; lineBuf[b + 4] = nodes[j].pos.y; lineBuf[b + 5] = nodes[j].pos.z
          lineCount++
        }
      }
    }
    linesRef.current.geometry.setDrawRange(0, lineCount * 2)
    linesRef.current.geometry.attributes.position.needsUpdate = true

    // Spawn pulses
    pulseTimer.current += dt
    if (
      pulseTimer.current > 0.45 &&
      connected.current.length > 0 &&
      pulses.current.length < MAX_PULSES
    ) {
      pulseTimer.current = 0
      const [from, to] = connected.current[Math.floor(Math.random() * connected.current.length)]
      pulses.current.push({ from, to, t: 0, speed: 0.7 + Math.random() * 0.9 })
    }

    // Update pulses
    pulses.current = pulses.current.filter(p => p.t < 1)
    for (let k = 0; k < pulses.current.length; k++) {
      const p = pulses.current[k]
      p.t += dt * p.speed
      const a = nodes[p.from].pos
      const b2 = nodes[p.to].pos
      pulseBuf[k * 3]     = a.x + (b2.x - a.x) * p.t
      pulseBuf[k * 3 + 1] = a.y + (b2.y - a.y) * p.t
      pulseBuf[k * 3 + 2] = a.z + (b2.z - a.z) * p.t
    }
    pulsePointsRef.current.geometry.setDrawRange(0, pulses.current.length)
    pulsePointsRef.current.geometry.attributes.position.needsUpdate = true

    // Group rotation + scroll scale
    groupRef.current.rotation.y += 0.0003
    const s = 1 + scrollRef.current * 0.45
    scaleTarget.set(s, s, s)
    groupRef.current.scale.lerp(scaleTarget, 0.035)
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points ref={pointsRef} geometry={nodeGeo}>
        <pointsMaterial color="#EDE9E2" size={0.032} sizeAttenuation transparent opacity={0.88} />
      </points>
      {/* Edges */}
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#EDE9E2" transparent opacity={0.18} />
      </lineSegments>
      {/* Pulses */}
      <points ref={pulsePointsRef} geometry={pulseGeo}>
        <pointsMaterial color="#FFFFFF" size={0.055} sizeAttenuation transparent opacity={1} />
      </points>
    </group>
  )
}

export default function ParticleNetwork() {
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / window.innerHeight)
    }
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 52 }}
      gl={{ alpha: true, antialias: true }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <NetworkScene scrollRef={scrollRef} mouseRef={mouseRef} />
    </Canvas>
  )
}
