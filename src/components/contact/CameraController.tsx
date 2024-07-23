import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'

interface CameraControllerProps {
  targetZoom: number
  reset: boolean
  onResetComplete: () => void
}

export default function CameraController({ targetZoom, reset, onResetComplete }: CameraControllerProps) {
  const { camera } = useThree()
  const initialPosition = useRef(camera.position.clone())
  const initialZoom = useRef(camera.zoom)

  useEffect(() => {
    if (reset) {
      camera.position.set(0, 0, 5)
      camera.zoom = 1
      camera.updateProjectionMatrix()
      onResetComplete()
    }
  }, [reset, camera, onResetComplete])

  useFrame(() => {
    const newZoom = THREE.MathUtils.lerp(camera.zoom, targetZoom, 0.1)
    camera.zoom = newZoom
    camera.updateProjectionMatrix()
  })

  return null
}
