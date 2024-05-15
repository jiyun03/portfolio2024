import { useState, useEffect } from 'react'

import ListsItem from '@/components/portfolio/ListItem'

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
    <div>
      {/* {JSON.values(lists).length > 0 ? lists : ''} */}
      {Object.entries(lists).map((item) => {
        return <ListsItem key={item[0]} name={item[0]} item={item[1]} />
      })}
    </div>
  )
}
