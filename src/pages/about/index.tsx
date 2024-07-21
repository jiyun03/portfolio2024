import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import Gallery from '@/components/about/Gallery'

import styled from 'styled-components'

export default function About() {
  const galleryArray = [
    {
      src: '/assets/img/about/conference.jpg',
      desc: '최신 개발 지식에 대해 공부하고 그에 대해 이야기 나누는 것을 좋아하여 컨퍼런스에 참여하는 것을 좋아해요',
    },
    { src: '/assets/img/about/swim.jpg', desc: '물놀이를 좋아해서 수영을 배우고 있어요' },
    { src: '/assets/img/about/memo.jpg', desc: '기록하고 정리하여 공유하는 것을 즐겨요' },
    { src: '/assets/img/about/band.jpg', desc: '밴드 음악을 좋아해서 기타를 배운적이 있어요' },
  ]

  return (
    <Container type="view">
      <TitleWrapper>
        <Title
          content={{
            title: 'ABOUT',
            subtitle: '저에 대해 알려드릴게요 :)',
          }}
        />
      </TitleWrapper>
      <Gallery images={galleryArray} />
      <AboutTitleWrapper>
        <div>👋 안녕하세요! 박지윤 입니다.</div>
      </AboutTitleWrapper>
      <div></div>
    </Container>
  )
}

const TitleWrapper = styled.div``

const AboutTitleWrapper = styled.div`
  font-size: 30rem;
  font-weight: 600;
`
