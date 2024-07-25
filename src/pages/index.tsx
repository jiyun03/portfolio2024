import { useState, useEffect } from 'react'

import Title from '@/components/common/Title'
import Container from '@/components/common/Container'
import Wave from '@/components/home/Wave'
import Drop from '@/components/home/Drop'

import styled from 'styled-components'

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const subtitle = isMobile
    ? '안녕하세요 최신 개발 지식에 관심이 많은 🌐\n사용자의 입장에서 생각하는 👥\n지식을 공유하는 개발자를 목표로 하는 👩🏻‍💻\n개발자 박지윤입니다.'
    : '안녕하세요 최신 개발 지식에 관심이 많은 🌐 사용자의 입장에서 생각하는 👥\n지식을 공유하는 개발자를 목표로 하는 👩🏻‍💻 개발자 박지윤입니다.'

  return (
    <HomeWrapper>
      <Container>
        <Drop />
        <Title
          content={{
            title: "WELCOME\nJIYUN's PORTFOLIO",
            subtitle: subtitle,
            link: {
              href: '/point',
              title: '프로젝트 보러가기',
              class: 'drop__btn',
            },
          }}
        />
        <Wave />
      </Container>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
  position: relative;
  height: calc(100vh - 158rem);
  .title {
    text-align: center;
    .title {
      &__title {
        font-size: 80rem;
        line-height: 1.2;
        ${({ theme }) => theme.xl`
          font-size: 70rem;
        `}
        ${({ theme }) => theme.lg`
          font-size: 50rem;
        `}
        ${({ theme }) => theme.md`
          font-size: 35rem;
        `}
      }
      &__subtitle {
        margin-top: 15rem;
        font-size: 25rem;
        white-space: pre-line;
        ${({ theme }) => theme.xl`
          font-size: 23rem;
        `}
        ${({ theme }) => theme.lg`
          font-size: 22rem;
        `}
        ${({ theme }) => theme.md`
          font-size: 18rem;
        `}
      }
    }
    .drop__btn {
      margin-top: 40rem;
      padding: 15rem 35rem 19rem;
      font-size: 25rem;
      transition: background 0.3s, color 0.3s;
      ${({ theme }) => theme.xl`
        font-size: 23rem;
      `}
      ${({ theme }) => theme.lg`
        font-size: 22rem;
      `}
      ${({ theme }) => theme.md`
        margin-top: 30rem;
        padding: 13rem 30rem;
        font-size: 18rem;
      `}
    }
  }
`
