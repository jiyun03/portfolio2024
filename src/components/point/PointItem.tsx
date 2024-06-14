import React from 'react'
import styled from 'styled-components'

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

interface PointItemProps {
  item: ProjectDetails
}

export default function PointItem({ item }: PointItemProps) {
  const tag: Array<string> = item.title.tag.split('|')

  return (
    <PointItemWrapper>
      <div>{item.title.title}</div>
      <div>
        {tag.length !== 0 &&
          tag.map((tags, idx) => {
            return <span key={idx}>{tags}</span>
          })}
      </div>
    </PointItemWrapper>
  )
}

const PointItemWrapper = styled.div`
  border: 1px solid #2b2b2b;
  margin-bottom: 80rem;
`
