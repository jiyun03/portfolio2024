import { useState, useEffect } from 'react'
import { useTheme } from '@/context/themeProvider'
import { Portfolio } from '@/types/point'

import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import SearchNone from '@/components/common/SearchNone'
import Loading from '@/components/common/Loading'
import PointItem from '@/components/point/PointItem'

import styled, { keyframes } from 'styled-components'
import IC_Sun from '/public/assets/icons/sun.svg'
import IC_Moon from '/public/assets/icons/moon.svg'

export default function Index() {
  const [points, setPoints] = useState<Portfolio>({})
  const [pointsLoading, setPointsLoading] = useState<boolean>(true)
  const [themeMode] = useTheme()

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
    <>
      <Container>
        <Title
          content={{
            title: '포인트 포트폴리오 목록',
            subtitle: '재직 중 작업한 프로젝트 중 포인트가 있는 프로젝트 목록입니다.\n최근 작업한 프로젝트로 구성되어 있습니다 :)',
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
                <SearchNone title="프로젝트 목록이 없습니다." />
              )
            ) : (
              <Loading />
            )}
          </div>
        </PointWrapper>
      </Container>
      <CloudWrapper>
        <div
          className="cloud cloud--front"
          style={{
            backgroundImage: `url(/assets/img/point/cloud-front-${themeMode}.png)`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        />
        <div
          className="cloud cloud--back"
          style={{
            backgroundImage: `url(/assets/img/point/cloud-back-${themeMode}.png)`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        />
        {themeMode === 'light' ? <IC_Sun className="cloud__ico cloud__ico--sun" /> : <IC_Moon className="cloud__ico cloud__ico--moon" />}
      </CloudWrapper>
    </>
  )
}

const cloudMoveFront = keyframes`
  0%   { transform: translateY(0); }
  100% { transform: translateY(10rem) ; }
`

const cloudMoveBack = keyframes`
  0%   { transform: translateY(0); }
  100% { transform: translateY(15rem) ; }
`

const PointWrapper = styled.div`
  margin-bottom: 50rem;
  .points {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
`

const CloudWrapper = styled.div`
  position: relative;
  height: 400rem;
  ${({ theme }) => theme.sm`
    height: 200rem;
  `}
  .cloud {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    &--back {
      z-index: 1;
      animation: ${cloudMoveBack} 1s linear infinite alternate;
    }
    &--front {
      z-index: 3;
      animation: ${cloudMoveFront} 1s linear infinite alternate;
    }
    &__ico {
      position: absolute;
      left: 100rem;
      bottom: 240rem;
      width: 150rem;
      height: 150rem;
      cursor: pointer;
      z-index: 2;
      ${({ theme }) => theme.xl`
        left: 24rem;
      `}
      ${({ theme }) => theme.sm`
        bottom: 120rem;
        width: 100rem;
        height: 100rem;
      `}
      &--sun {
        transition: transform 2s;
        &:hover {
          transform: rotate(180deg);
        }
      }
      &--moon {
        transition: transform 1s;
        &:hover {
          transform: rotate(60deg);
        }
      }
    }
  }
`
