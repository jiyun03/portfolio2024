import { useEffect, useRef, useMemo, useCallback } from 'react'
import { useTheme } from '@/context/themeProvider'

import styled from 'styled-components'

export default function Wave() {
  const [themeMode] = useTheme()
  const canvasTarget = useRef<HTMLCanvasElement | null>(null)
  const currentMode = themeMode === 'light'
  const slowness = 1

  const colorObject = useMemo(() => {
    return {
      foregroundLeftColor: currentMode ? 'rgba(102, 51, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
      foregroundRightColor: currentMode ? 'rgba(0, 153, 204, 0.3)' : 'rgba(255, 255, 255, 0.8)',
      backgroundLeftColor: currentMode ? 'rgba(102, 51, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)',
      backgroundRightColor: currentMode ? 'rgba(0, 153, 204, 0.8)' : 'rgba(255, 255, 255, 0.3)',
    }
  }, [currentMode])

  // 캔버스 리사이즈
  const resizeCanvas = useCallback(() => {
    if (!canvasTarget.current) return
    const canvas = canvasTarget.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.5
  }, [])

  useEffect(() => {
    const canvas = canvasTarget.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pi = Math.PI
    let time = 0

    const getWaveHeights = (revsPerCanvas: number, waveSpeed: number, waveHeight: number, time: number, startAngle: number): number[] => {
      const canvasHeight = canvas.height
      const canvasWidth = canvas.width
      const amplitude = (waveHeight * canvasHeight) / 4
      const frequency = revsPerCanvas / canvasWidth
      const heightArray: number[] = []
      waveSpeed /= slowness

      for (let x = 0; x <= canvasWidth; x += 1) {
        const y = Math.sin(x * frequency * 2 * pi - waveSpeed * time + startAngle) * amplitude
        heightArray.push(y)
      }
      return heightArray
    }

    const drawing = (summedHeights: number[], colorLeft: string, colorRight: string) => {
      const canvasHeight = canvas.height
      const canvasWidth = canvas.width

      ctx.beginPath()
      ctx.moveTo(0, 0)

      for (let x = 0; x <= canvasWidth; x += 1) {
        ctx.lineTo(x, canvasHeight / 2 + summedHeights[x])
      }
      ctx.lineTo(canvasWidth, canvasHeight)
      ctx.lineTo(0, canvasHeight)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, 0, canvasWidth, 0)
      gradient.addColorStop(0, colorLeft)
      gradient.addColorStop(1, colorRight)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const loop = () => {
      const canvasHeight = canvas.height
      const canvasWidth = canvas.width

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      const waveFront1 = getWaveHeights(1, 0.007, 0.75, time, 0)
      const waveFront2 = getWaveHeights(2, 0.003, 0.25, time, 0.5)
      const sumWavesFront = waveFront1.map((value, index) => value + waveFront2[index])
      drawing(sumWavesFront, colorObject.foregroundLeftColor, colorObject.foregroundRightColor)

      const waveBack1 = getWaveHeights(1, 0.01, 1, time, 3)
      const waveBack2 = getWaveHeights(2, 0.005, 0.5, time, 3.5)
      const sumWavesBack = waveBack1.map((value, index) => value + waveBack2[index])
      drawing(sumWavesBack, colorObject.backgroundLeftColor, colorObject.backgroundRightColor)

      time++
      requestAnimationFrame(loop)
    }

    resizeCanvas()
    loop()

    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [colorObject, resizeCanvas])

  return (
    <CanvasWrapper>
      <canvas ref={canvasTarget}></canvas>
    </CanvasWrapper>
  )
}

const CanvasWrapper = styled.div`
  canvas {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
  }
`
