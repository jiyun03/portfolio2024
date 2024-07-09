import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import Gallery from '@/components/about/Gallery'

import styled from 'styled-components'

export default function About() {
  const galleryArray = [
    {
      src: '/assets/img/about/conference.jpg',
      desc: '최신 개발 지식에 대해 공부하고 그에 대해 이야기 나누는 것을 좋아하여 컨퍼런스에 참여해요.',
    },
    { src: '/assets/img/about/swim.jpg', desc: '물놀이를 좋아해서 수영을 배우고 있어요.' },
    { src: '/assets/img/about/memo.jpg', desc: '정리하는 것을 즐겨해요' },
    { src: '/assets/img/about/band.jpg', desc: '밴드 음악을 좋아해서 기타를 잠깐 배운적이 있어요.' },
  ]

  return (
    <Container type="view">
      <Title
        content={{
          title: 'ABOUT',
          subtitle: '저에 대해 알려드릴게요 :)',
        }}
      />
      <Gallery images={galleryArray} />
      <TitleWrapper>
        <div>👋 안녕하세요! 입니다.</div>
      </TitleWrapper>
      <div></div>
    </Container>
  )
}

const TitleWrapper = styled.div`
  font-size: 30rem;
  font-weight: 600;
`
