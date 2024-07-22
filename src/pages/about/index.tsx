import Link from 'next/link'
import Image from 'next/image'
import { GalleryImage, AboutItemArray } from '@/types/about'

import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import Gallery from '@/components/about/Gallery'
import AboutItem from '@/components/about/AboutItem'

import styled, { keyframes } from 'styled-components'

export default function About() {
  const galleryArray: GalleryImage[] = [
    {
      src: '/assets/img/about/conference.jpg',
      desc: '최신 개발 지식에 대해 공부하고 그에 대해 이야기 나누는 것을 좋아하여 컨퍼런스에 참여하는 것을 좋아해요',
    },
    { src: '/assets/img/about/swim.jpg', desc: '물놀이를 좋아해서 수영을 배우고 있어요' },
    { src: '/assets/img/about/memo.jpg', desc: '기록하고 정리하여 공유하는 것을 즐겨요' },
    { src: '/assets/img/about/band.jpg', desc: '밴드 음악을 좋아해서 기타를 배운적이 있어요' },
  ]

  const aboutArray: AboutItemArray[] = [
    {
      profile: [
        { title: '이름', content: '박지윤' },
        { title: '생년월일', content: '1996.06.20' },
        { title: '전화번호', content: '010-6610-8728' },
        { title: '이메일', content: 'sprare06@gmail.com' },
        { title: '주소', content: '인천광역시 부평구' },
      ],
    },
    {
      experience: [
        {
          title: '2022.01',
          content: [
            {
              subtitle: '2022.01 ~ 2024.05',
              title: '디파이 입사',
            },
          ],
        },
        {
          title: '2020.02',
          content: [
            {
              subtitle: '2020.02 ~ 2021.11',
              title: '웹에이전시 스프린트 입사',
            },
          ],
        },
        {
          title: '2019.08',
          content: [
            {
              subtitle: '2019.08 ~ 2019.11',
              title: '주식회사 쇼엠 입사',
            },
          ],
        },
        {
          title: '2019.02',
          content: [
            {
              subtitle: '2015.03 ~ 2019.02',
              title: '물리학과 졸업',
            },
            {
              subtitle: '2019.02 ~ 2019.08',
              title: '그린컴퓨터아카데미 인천 모바일 UIUX(웹디자인, 웹퍼블리셔) 실무자양성과정 수강',
            },
          ],
        },
      ],
    },
    {
      skill: [
        {
          title: 'Front-End',
          content: ['react', 'vue', 'nuxt', 'next', 'vanillajs', 'typescript', 'jquery', 'html5', 'css3', 'scss', 'bootstrap'],
        },
        {
          title: 'Design',
          content: ['photoshop', 'illustrator'],
        },
        {
          title: 'Design 협업툴',
          content: ['zeplin', 'figma', 'xd'],
        },
        {
          title: '협업툴',
          content: ['git', 'notion', 'slack'],
        },
      ],
    },
    {
      license: [
        {
          title: '2019.06',
          content: [
            {
              title: 'GTQ 1급',
            },
            {
              title: '웹디자인 기능사',
            },
          ],
        },
      ],
    },
  ]

  return (
    <Container type="view">
      {/* 타이틀 */}
      <TitleWrapper>
        <Title
          content={{
            title: 'ABOUT',
            subtitle: '저에 대해 알려드릴게요 :)',
          }}
        />
        <div className="btn-wrap">
          <Link href="https://outgoing-manager-a91.notion.site/aaeb5293678643f0af8c7d9bf653ad1a?pvs=25" className="btn">
            이력서 보러가기
          </Link>
        </div>
      </TitleWrapper>
      {/* 갤러리 */}
      <Gallery images={galleryArray} />
      {/* 타이틀 */}
      <AboutTitleWrapper>
        <span className="emoji">👋</span> 안녕하세요! 박지윤 입니다.
      </AboutTitleWrapper>
      {/* 어바웃  */}
      <AboutWrapper>
        <AboutItem number="01" name="PROFILE" item={aboutArray[0]}>
          <Image src="/assets/img/about/smile.png" width="300" height="300" alt="얼굴 이미지" />
        </AboutItem>
        <AboutItem number="02" name="EXPERIENCE" item={aboutArray[1]} />
        <AboutItem number="03" name="SKILL & SKILL TOOL" item={aboutArray[2]} />
        <AboutItem number="04" name="LICENSE" item={aboutArray[3]} />
      </AboutWrapper>
    </Container>
  )
}

const hello = keyframes`
  30%   { transform: rotate(-15deg); }
  60%  { transform: rotate(15deg); }
  100% { transform: rotate(0); }
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  ${({ theme }) => theme.sm`
    display: block
  `}
  .title {
    ${({ theme }) => theme.sm`
      margin-bottom: 10rem;
    `}
  }
  .btn {
    display: inline-block;
    padding: 15rem 40rem;
    margin-bottom: 48rem;
    border: ${({ theme }) => theme.borderColor};
    border-radius: 30rem;
    transition: box-shadow 0.8s, color 0.8s;
    &-wrap {
      text-align: right;
    }
    &:hover {
      box-shadow: 300px 0 0 0 rgba(57, 57, 57, 1) inset, -300px 0 0 0 rgba(57, 57, 57, 1) inset;
      color: #fff;
    }
  }
`

const AboutTitleWrapper = styled.div`
  font-size: 30rem;
  font-weight: 600;
  .emoji {
    display: inline-block;
    cursor: pointer;
    &:hover {
      animation: ${hello} 1s linear infinite alternate;
    }
  }
`

const AboutWrapper = styled.div``
