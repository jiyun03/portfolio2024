import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import BusinessCard from '@/components/contact/BusinessCard'
import CameraController from '@/components/contact/CameraController'
import ZoomControls from '@/components/contact/ZoomControls'
import ColorPalette from '@/components/contact/ColorPalette'

import styled from 'styled-components'

export default function Index() {
  const defaultColor = '#00355c'
  const [targetZoom, setTargetZoom] = useState(1)
  const [cardColor, setCardColor] = useState(defaultColor)
  const [reset, setReset] = useState(false)

  const zoomIn = () => setTargetZoom((prevZoom) => prevZoom * 1.2)
  const zoomOut = () => setTargetZoom((prevZoom) => prevZoom / 1.2)

  const resetSettings = useCallback(() => {
    setCardColor(defaultColor)
    setTargetZoom(1)
    setReset(true)
  }, [])

  const handleResetComplete = useCallback(() => {
    setReset(false)
  }, [])

  return (
    <Container>
      <Title
        content={{
          title: 'CONTACT',
          subtitle: 'Three.js를 통해 표현한 3D 명함입니다.\n문의사항이 있으실 시 연락 주시면 최대한 빨리 회신드리겠습니다 :D',
        }}
      />
      <ContactWrapper>
        <Canvas>
          <ambientLight intensity={Math.PI} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={0.5} />
          <BusinessCard cardColor={cardColor} />
          <OrbitControls />
          <CameraController targetZoom={targetZoom} reset={reset} onResetComplete={handleResetComplete} />
        </Canvas>
        <ColorPalette onColorChange={setCardColor} />
        <ZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetSettings} />
      </ContactWrapper>
    </Container>
  )
}

const ContactWrapper = styled.div`
  position: relative;
  height: calc(100vh - 350px);
  width: 100%;
  overflow: hidden;
  ${({ theme }) => theme.sm`
    height: calc(100vh - 320px);
  `}
  canvas {
    background-color: #c8daff;
    height: 100%;
    width: 100%;
  }
`
