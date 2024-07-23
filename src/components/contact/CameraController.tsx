import { useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'

interface CameraControllerProps {
  targetZoom: number
}

export default function CameraController({ targetZoom }: CameraControllerProps) {
  const { camera } = useThree()
  const [_, setZoom] = useState(camera.zoom)

  useFrame(() => {
    setZoom((prevZoom) => {
      const newZoom = THREE.MathUtils.lerp(prevZoom, targetZoom, 0.1)
      camera.zoom = newZoom
      camera.updateProjectionMatrix()
      return newZoom
    })
  })

  return null
}
