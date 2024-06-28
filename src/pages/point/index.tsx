import { useState, useEffect } from 'react'
import Image from 'next/image'

import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import PointItem from '@/components/point/PointItem'

import styled, { keyframes } from 'styled-components'
import IC_Loading from '/public/assets/icons/loading.svg'
import IC_Sun from '/public/assets/icons/sun.svg'
import IC_Moon from '/public/assets/icons/moon.svg'

interface TitleType {
  subtitle: string
  title: string
  tag: string
  color: string
  content: string
  feel: string
}

interface Kind {
  date: string
  work: string
  type: string
  url: string
}

interface ZigzagItem {
  title: string
  content: string
}

interface Btn {
  prev?: string
  next: string
}

interface ProjectDetails {
  name: string
  title: TitleType
  kind: Kind
  zigzag: Record<string, ZigzagItem>
  btn: Btn
}

interface Portfolio {
  [key: string]: ProjectDetails
}

export default function Index() {
  const [points, setPoints] = useState<Portfolio>({})
  const [pointsLoading, setPointsLoading] = useState<boolean>(true)

  useEffect(() => {
    const dataFetch = async (): Promise<void> => {
      const response = await fetch('/api/point')
      const pointLists = await response.json()
      setPoints(pointLists)
      setPointsLoading(false)
    }
    dataFetch()
  }, [])

  return (
    <Container type="view">
      <Title
        content={{
          title: '포인트 포트폴리오 목록',
          subtitle: '재직중 작업한 프로젝트 목록입니다.\n모든 사이트는 반응형으로 제작되었습니다 :)',
        }}
      />
      <PointWrapper>
        <div className="points">
          {!pointsLoading ? (
            Object.values(points).length !== 0 ? (
              Object.values(points).map((item, idx) => {
                return <PointItem key={idx} item={item} index={idx} />
              })
            ) : (
              // 이거 좀 꾸며...
              '프로젝트 목록이 없습니다'
            )
          ) : (
            <div className="points__none">
              <IC_Loading />
            </div>
          )}
        </div>
      </PointWrapper>
      <CloudWrapper>
        <div
          className="cloud cloud--front"
          style={{
            background: 'url(/assets/img/point/cloud-front.png) repeat-x center',
            backgroundSize: 'contain',
          }}
        />
        <div
          className="cloud cloud--back"
          style={{
            background: 'url(/assets/img/point/cloud-back.png) repeat-x center',
            backgroundSize: 'contain',
          }}
        />
        <IC_Sun
          className="cloud__ico cloud__ico--sun"
          onClick={() => {
            console.log('red')
          }}
        />
        {/* <IC_Moon className="cloud__ico cloud__ico--moon" /> */}
      </CloudWrapper>
    </Container>
  )
}

const cloudFlow = keyframes`
  0%   { transform: translateY(0); }
  100% { transform: translateY(10rem) ; }
`

const PointWrapper = styled.div`
  margin-top: 80rem;
  .points {
    position: relative;
    z-index: 4;
    &__none {
      svg {
        display: block;
        width: 110rem;
        margin: auto;
      }
    }
  }
`

const CloudWrapper = styled.div`
  .cloud {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 500rem;
    pointer-events: none;
    z-index: 2;
    animation: ${cloudFlow} 1s linear infinite alternate;
    &--back {
      z-index: 1;
    }
    &--front {
      z-index: 3;
    }
    &__ico {
      position: fixed;
      left: 100rem;
      bottom: 330rem;
      width: 150rem;
      height: 150rem;
      z-index: 2;
    }
  }
`
