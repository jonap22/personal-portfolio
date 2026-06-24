'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GlobeScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const scaleRef = useRef(0.5)

  const dotsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const count = 320
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.003
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.0006
    const target = 0.5 + scrollRef.current * 0.9
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, 0.035)
    groupRef.current.scale.setScalar(scaleRef.current)
  })

  return (
    // Tilt toward Americas; offset down so globe rises into view on scroll
    <group ref={groupRef} position={[0, -0.7, 0]} rotation={[0.18, -0.45, 0]}>
      {/* Fine latitude/longitude grid */}
      <mesh>
        <sphereGeometry args={[1, 28, 28]} />
        <meshBasicMaterial color="#EDE9E2" wireframe transparent opacity={0.08} />
      </mesh>
      {/* Coarse, more visible grid */}
      <mesh>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#EDE9E2" wireframe transparent opacity={0.18} />
      </mesh>
      {/* Surface dots */}
      <points geometry={dotsGeo}>
        <pointsMaterial color="#EDE9E2" size={0.016} sizeAttenuation transparent opacity={0.38} />
      </points>
    </group>
  )
}

export default function Globe() {
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / window.innerHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0.3, 2.8], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <GlobeScene scrollRef={scrollRef} />
    </Canvas>
  )
}
