import styled from 'styled-components'

interface TitleProps {
  content: {
    title: string
    subtitle: string
  }
}

export default function Title({ content }: TitleProps) {
  return (
    <TitleWrapper className="title">
      <div className="title__title">{content.title}</div>
      <div className="title__subtitle">{content.subtitle}</div>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  margin-bottom: 48rem;
  .title {
    &__title {
      font-size: 48rem;
      font-weight: 700;
      font-family: 'Montserrat', 'AppleSDGothicNeo';
    }
    &__subtitle {
      font-size: 19.2rem;
      white-space: pre-line;
    }
  }
`
