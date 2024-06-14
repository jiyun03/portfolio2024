import { useState, useEffect } from 'react'

interface Title {
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
  title: Title
  kind: Kind
  zigzag: Record<string, ZigzagItem>
  btn: Btn
}

interface Portfolio {
  [key: string]: ProjectDetails
}

export default function Index() {
  const [points, setPoints] = useState<Portfolio[]>([])
  const [pointsLoading, setPointsLoading] = useState<boolean>(true)

  // [리스트] 리스트 json 데이터 불러오기
  useEffect(() => {
    const dataFetch = async (): Promise<void> => {
      const response = await fetch('/api/point')
      const pointLists = await response.json()
      await setPoints(pointLists)
      await setPointsLoading(false)
    }
    dataFetch()
  }, [])

  return <div>index</div>
}
