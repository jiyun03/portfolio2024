import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Text, useTexture, Plane } from '@react-three/drei'

interface CameraControllerProps {
  targetZoom: number
}

interface ZoomControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
}

// Card 컴포넌트
const Card = () => {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // 이미지 로드
  const profileTexture = useTexture('/assets/img/about/smile.png')

  useFrame(() => {
    // hover 아닐 때 회전
    if (ref.current && !hovered) {
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <RoundedBox
      ref={ref}
      args={[3.5, 2, 0.1]}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 앞면 */}
      <meshStandardMaterial attach="material" color={hovered ? 'lightblue' : 'white'} />

      {/* 앞면 이미지 */}
      <Plane args={[0.8, 0.8]} position={[-1.5, 0.5, 0.06]}>
        <meshStandardMaterial attach="material" map={profileTexture} />
      </Plane>

      {/* 앞면 텍스트 */}
      <Text position={[-1.2, 0.2, 0.06]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
        박지윤
      </Text>
      <Text position={[-0.92, -0.1, 0.06]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        프론트엔드 개발자
      </Text>
      <Text position={[-1, -0.4, 0.06]} fontSize={0.1} color="black" anchorX="center" anchorY="middle">
        sprare06@gmail.com
      </Text>

      {/* 뒷면 */}
      <Plane args={[3.5, 2]} position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial attach="material" color={hovered ? 'lightblue' : 'white'} />
        <Text position={[-1.5, 0.5, 0.01]} fontSize={0.1} color="black" anchorX="center" anchorY="middle">
          추가 정보
        </Text>
      </Plane>
    </RoundedBox>
  )
}

// CameraController 컴포넌트
const CameraController = ({ targetZoom }: CameraControllerProps) => {
  const { camera } = useThree()
  const [zoom, setZoom] = useState(camera.zoom)

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

// ZoomControls 컴포넌트
const ZoomControls = ({ onZoomIn, onZoomOut }: ZoomControlsProps) => {
  return (
    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
      <button onClick={onZoomIn} style={{ margin: '5px', padding: '10px' }}>
        Zoom In
      </button>
      <button onClick={onZoomOut} style={{ margin: '5px', padding: '10px' }}>
        Zoom Out
      </button>
    </div>
  )
}

export default function Index() {
  const [targetZoom, setTargetZoom] = useState(1)

  const zoomIn = () => setTargetZoom((prevZoom) => prevZoom * 1.2)
  const zoomOut = () => setTargetZoom((prevZoom) => prevZoom / 1.2)

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Canvas style={{ background: '#c8daff', height: '100%', width: '100%' }}>
        <ambientLight intensity={Math.PI} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Card />
        <OrbitControls />
        <CameraController targetZoom={targetZoom} />
      </Canvas>
      <ZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} />
    </div>
  )
}
