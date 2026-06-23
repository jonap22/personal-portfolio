'use client'

export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none select-none"
      aria-hidden="true"
      style={{
        opacity: 0.038,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
        mixBlendMode: 'multiply',
      }}
    />
  )
}
