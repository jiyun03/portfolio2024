import Link from 'next/link'

import styled from 'styled-components'

interface TitleProps {
  content: {
    title: string
    subtitle: string
    link?: {
      href: string
      title: string
      class?: string
    }
  }
  children?: React.ReactNode
}

export default function Title({ content, children }: TitleProps) {
  return (
    <TitleWrapper className="title">
      <div className="title__title">{content.title}</div>
      <div className="title__subtitle">{content.subtitle}</div>
      {content.link && (
        <Link href={content.link.href} className={`title__btn ${content.link.class ? content.link.class : ''}`}>
          {content.link.title}
        </Link>
      )}
      {children && children}
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 48rem;
  white-space: pre-line;
  .title {
    &__title {
      font-size: 48rem;
      font-weight: 700;
      font-family: 'Montserrat', 'AppleSDGothicNeo';
    }
    &__subtitle {
      font-size: 19.2rem;
    }
    &__btn {
      display: inline-block;
      margin-top: 20rem;
      padding: 10rem 20rem;
      border: 1px solid #7d7d7d;
      border-radius: 40rem;
    }
  }
`
