import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

import styled, { keyframes } from 'styled-components'

interface DropProps {
  isMobile: boolean
  isLight: boolean
}

export default function Drop({ isMobile, isLight }: DropProps) {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false) // 768
  const [dropInterval, setDropInterval] = useState<NodeJS.Timeout | null>(null)
  const dropElement = useRef<HTMLDivElement | null>(null)

  // 옵션
  const particleMax = isMobileWidth ? 6 : 10
  const dropSetTime = 1500
  const dropImg = useMemo(() => {
    const images = []
    for (let i = 1; i <= 38; i++) {
      images.push(`/assets/img/home/drop${i}.png`)
    }
    return images
  }, [])

  const dropInit = useCallback(() => {
    if (!dropElement.current) return

    const dropImgLength = dropImg.length

    // 랜덤 환경 설정
    const randomWidth = isMobileWidth ? randomUnitInterval(75, 100, 10) : randomUnitInterval(120, 150, 20)
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
    createImg.style.animationDuration = `${dropSetTime / 1000}s`

    // 이미지가 최대 particle 수 보다 커지면 remove
    if (dropElement.current.childElementCount > particleMax) {
      dropElement.current.removeChild(dropElement.current.firstElementChild!)
    }
  }, [dropImg, isMobileWidth, windowWidth, particleMax])

  // random 최대, 최소값 설정
  const randomInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const randomUnitInterval = (min: number, max: number, unit: number): number => {
    return Math.floor(Math.random() * ((Math.floor(max) - Math.ceil(min)) / unit + 1)) * unit + Math.ceil(min)
  }

  const dropActive = useCallback(() => {
    if (dropElement.current) {
      const interval = setInterval(() => dropInit(), dropSetTime / particleMax)
      setDropInterval(interval)
      document.querySelector<HTMLAnchorElement>('.page-home')?.classList.add('s-active')
    }
  }, [particleMax, dropInit])

  const dropClear = useCallback(() => {
    if (dropElement.current && dropInterval) {
      clearInterval(dropInterval)
      setDropInterval(null)
      dropElement.current.replaceChildren()
    }
    document.querySelector<HTMLAnchorElement>('.page-home')?.classList.remove('s-active')
  }, [dropInterval])

  // 윈도우 리사이즈 이벤트 핸들러
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileWidth(true)
      } else {
        setIsMobileWidth(false)
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
    if (btnElement && !isMobile) {
      btnElement.addEventListener('mouseenter', dropActive)
      btnElement.addEventListener('mouseleave', dropClear)
    }
    return () => {
      if (btnElement && !isMobile) {
        btnElement.removeEventListener('mouseenter', dropActive)
        btnElement.removeEventListener('mouseleave', dropClear)
      }
    }
  }, [isMobile, dropActive, dropClear])

  // 모바일 기기 light 기능
  useEffect(() => {
    if (isMobile && isLight) {
      dropActive()
    } else {
      dropClear()
    }
  }, [isMobile, isLight])

  return <DropWrapper className="drop" ref={dropElement} />
}

const dropDown = keyframes`
  0%   { top: -150rem; }
  100% { top: 100vh; }
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
