import { useState, useEffect } from 'react'

import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import ListsItem from '@/components/portfolio/ListItem'

import styled from 'styled-components'

interface PortfolioItem {
  [key: string]: {
    title: string
    status: string
    link: string
    subtitle: string
    date: string
    works: string
    company: string
    type: string
  }
}

export default function Index() {
  const [lists, setLists] = useState<PortfolioItem>({})

  useEffect(() => {
    // [리스트] 리스트 json 데이터 불러오기
    const dataFetch = async () => {
      const response = await fetch('/api/portfolio')
      const portfolioLists = await response.json()
      await setLists(portfolioLists)
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
      <ListsWrapper>
        <div className="lists">
          <div className="lists-wrap">
            {/* {JSON.values(lists).length > 0 ? lists : ''} */}
            {Object.entries(lists).map((item) => {
              return <ListsItem key={item[0]} name={item[0]} item={item[1]} />
            })}
          </div>
        </div>
      </ListsWrapper>
    </Container>
  )
}

const ListsWrapper = styled.div`
  margin-bottom: 70rem;
  ${({ theme }) => theme.sm`
    margin-bottom: 40rem;
  `}
  .lists {
    &-wrap {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
    }
    &__item {
      flex: 0 0 33.3333%;
      max-width: 33.3333%;
      padding: 0 10px;
      ${({ theme }) => theme.lg`
        flex: 0 0 50%;
        max-width: 50%;
      `}
      ${({ theme }) => theme.sm`
        flex: 0 0 100%;
        max-width: 100%;
      `}
    }
    &__none {
      svg {
        display: block;
        width: 110rem;
        margin: auto;
      }
    }
  }
`
