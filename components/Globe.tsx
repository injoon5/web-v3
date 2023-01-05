import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

export default function Footer() {
  const canvasRef = useRef()

  useEffect(() => {
    let phi = 0

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      offset: [0, 0],
      opacity: 0.9,
      markers: [{ location: [37.5642135, 127.0016985], size: 0.05 }],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi
        phi += 0.005
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }} />
  )
}
