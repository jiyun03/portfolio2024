import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

import styled, { keyframes } from 'styled-components'

export default function Drop() {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [reactingInterval, setReactingInterval] = useState<NodeJS.Timeout | null>(null)
  const dropElement = useRef<HTMLDivElement | null>(null)

  // 옵션
  const particleMax = isMobile ? 6 : 10
  const reactingSetTime = 1500
  const dropImg = useMemo(() => {
    const images = []
    for (let i = 1; i <= 38; i++) {
      images.push(`/assets/img/home/drop${i}.png`)
    }
    return images
  }, [])

  const reactingInit = useCallback(() => {
    if (!dropElement.current) return

    const dropImgLength = dropImg.length

    // 랜덤 환경 설정
    const randomWidth = isMobile ? randomUnitInterval(75, 100, 10) : randomUnitInterval(120, 150, 20)
    const randomRotate = randomInterval(-10, 10)
    const randomIndex = randomInterval(0, dropImgLength - 1)
    const randomX = Math.random() * (windowWidth - 100)

    // 이미지 생성 및 설정
    const createImg = document.createElement('img')
    createImg.src = dropImg[randomIndex]
    dropElement.current.appendChild(createImg)

    createImg.style.width = randomWidth + 'rem'
    createImg.style.height = randomWidth + 'rem'
    createImg.style.left = randomX + 'px'
    createImg.style.transform = `rotate(${randomRotate}deg)`
    createImg.style.animationDuration = `${reactingSetTime / 1000}s`

    // 이미지가 최대 particle 수 보다 커지면 remove
    if (dropElement.current.childElementCount > particleMax) {
      dropElement.current.removeChild(dropElement.current.firstElementChild!)
    }
  }, [dropImg, isMobile, windowWidth, particleMax])

  // random 최대, 최소값 설정
  const randomInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const randomUnitInterval = (min: number, max: number, unit: number): number => {
    return Math.floor(Math.random() * ((Math.floor(max) - Math.ceil(min)) / unit + 1)) * unit + Math.ceil(min)
  }

  const reactingActive = useCallback(() => {
    if (dropElement.current) {
      const interval = setInterval(() => reactingInit(), reactingSetTime / particleMax)
      setReactingInterval(interval)
      document.querySelector<HTMLAnchorElement>('.page-home')?.classList.add('s-active')
    }
  }, [particleMax, reactingInit])

  const reactingClear = useCallback(() => {
    if (dropElement.current && reactingInterval) {
      clearInterval(reactingInterval)
      setReactingInterval(null)
      dropElement.current.replaceChildren()
    }
    document.querySelector<HTMLAnchorElement>('.page-home')?.classList.remove('s-active')
  }, [reactingInterval])

  // 윈도우 리사이즈 이벤트 핸들러
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 이벤트
  useEffect(() => {
    const btnElement = document.querySelector<HTMLAnchorElement>('.drop__btn')
    if (btnElement) {
      btnElement.addEventListener('mouseenter', reactingActive)
      btnElement.addEventListener('mouseleave', reactingClear)
    }
    return () => {
      if (btnElement) {
        btnElement.removeEventListener('mouseenter', reactingActive)
        btnElement.removeEventListener('mouseleave', reactingClear)
      }
    }
  }, [reactingActive, reactingClear])

  return <DropWrapper className="drop" ref={dropElement} />
}

const dropDown = keyframes`
  0%   { top: -150rem; }
  100% { top: 100vh;}
`

const DropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  img {
    position: absolute;
    left: 0;
    top: -150rem;
    max-width: 150rem;
    animation: ${dropDown} 1s linear;
    pointer-events: none;
    z-index: 1;
  }
`
