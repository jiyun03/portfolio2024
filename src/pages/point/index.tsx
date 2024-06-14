import { useState, useEffect } from 'react'

import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import PointItem from '@/components/point/PointItem'

import styled from 'styled-components'
import IC_Loading from '/public/assets/icons/loading.svg'

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
    <Container>
      <Title
        content={{
          title: '프로젝트 목록',
          subtitle: '재직중 작업한 프로젝트 목록입니다.\n모든 사이트는 반응형으로 제작되었습니다 :)',
        }}
      />
      <PointWrapper>
        <div className="points">
          {!pointsLoading ? (
            Object.values(points).length !== 0 ? (
              Object.values(points).map((item, idx) => {
                return <PointItem key={idx} item={item} />
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
    </Container>
  )
}

const PointWrapper = styled.div`
  margin-top: 80rem;
  .points {
    &__none {
      svg {
        display: block;
        width: 110rem;
        margin: auto;
      }
    }
  }
`
