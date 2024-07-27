import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ProjectDetails } from '@/types/point'
import { parseHtmlString } from '@/utils'

import Container from '@/components/common/Container'
import Ratio from '@/components/common/Ratio'
import Loading from '@/components/common/Loading'

import styled from 'styled-components'
import IC_Button_Out from '/public/assets/icons/button_out.svg'
import IC_Button_Back from '/public/assets/icons/button_back.svg'
import IC_Arrow_Prev from '/public/assets/icons/arrow_prev.svg'

export default function Page() {
  const router = useRouter()
  const { id: queryId } = router.query
  const [pointDetail, setPointDetail] = useState<ProjectDetails | null>(null)
  const [pointDetailLoading, setPointDetailLoading] = useState<boolean>(true)
  const tags: Array<string> = pointDetail ? pointDetail.title.tag.split('|') : []
  const colors: Array<string> = pointDetail ? pointDetail.title.color.split('|') : []

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/api/point?id=${queryId}`)
      const data = await response.json()
      setPointDetail(data)
      setPointDetailLoading(false)
    }

    if (queryId) {
      fetchProject()
    }
  }, [queryId])

  return pointDetailLoading ? (
    <Loading />
  ) : (
    <>
      {pointDetail && (
        <DetailWrapper>
          <Container type="view">
            <Ratio ratio="3_1" src={`/assets/img/portfolio/${pointDetail.name}/${pointDetail.name}-header.jpg`} />
            <IntroTitleWrapper>
              <div className="intro__subtitle">{pointDetail.title.subtitle}</div>
              <div className="intro__title">{pointDetail.title.title}</div>
              <div className="intro__tags-wrap">
                {tags.length !== 0 &&
                  tags.map((tag, idx) => (
                    <span key={idx} className="intro__tags">
                      #{tag}
                    </span>
                  ))}
              </div>
            </IntroTitleWrapper>
            <IntroContentWrapper>
              <div className="intro__content-item">
                <div className="intro__content-title">컬러</div>
                <div className="intro__content-color-wrap">
                  {colors.length !== 0 &&
                    colors.map((color, idx) => <span key={idx} className="intro__content-color" style={{ backgroundColor: `${color}` }} />)}
                </div>
              </div>
              <div className="intro__content-item">
                <div className="intro__content-title">설명</div>
                <div className="intro__content-content">{parseHtmlString(pointDetail.title.content)}</div>
              </div>
              <div className="intro__content-item">
                <div className="intro__content-title">느낀점</div>
                <div className="intro__content-content">{parseHtmlString(pointDetail.title.feel)}</div>
              </div>
            </IntroContentWrapper>
            <KindsWrapper>
              <div className="kind__item">
                <div className="kind__title">Date</div>
                <div className="kind__content">{pointDetail.kind.date}</div>
              </div>
              <div className="kind__item">
                <div className="kind__title">Tech Stack</div>
                <div className="kind__content">{pointDetail.kind.techStack}</div>
              </div>
              <div className="kind__item">
                <div className="kind__title">Work</div>
                <div className="kind__content">{pointDetail.kind.work}</div>
              </div>
            </KindsWrapper>
            {pointDetail.kind.url !== '' && (
              <ViewBtn>
                <Link href={pointDetail.kind.url} target="_blank" className="view__btn">
                  사이트 보러가기 <IC_Button_Out />
                </Link>
              </ViewBtn>
            )}
            <ZigzagWrapper>
              <div className="zigzag__title">VIEW POINT</div>
              <div className="zigzag__item-wrap">
                {Object.values(pointDetail.zigzag).map((zig, zigIdx) => (
                  <div key={zigIdx} className="zigzag__item">
                    <div className="zigzag__img">
                      <Ratio ratio="2_1" src={`/assets/img/portfolio/${pointDetail.name}/${pointDetail.name}-zig${zigIdx}.jpg`} />
                    </div>
                    <div className="zigzag__content">
                      <div className="zigzag__content-num">{String(zigIdx + 1).padStart(2, '0')}</div>
                      <div className="zigzag__content-title">{zig.title}</div>
                      <div className="zigzag__content-content">{zig.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ZigzagWrapper>
          </Container>
          {/* 메인 이미지 */}
          <MainImgWrapper>
            <Image
              src={`/assets/img/portfolio/${pointDetail.name}/${pointDetail.name}-main.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              alt="메인 이미지"
            />
          </MainImgWrapper>
          {/* 하단 네비게이션 */}
          <ViewNav>
            <Container type="view">
              <div className="view-nav">
                <div className="view-nav__title-wrap">
                  <div className="view-nav__title">{pointDetail.title.title}</div>
                </div>
                <div className="view-nav__btn-wrap">
                  {pointDetail.btn?.prev !== '' && (
                    <Link href={`/point/${pointDetail.btn?.prev}`} className="view-nav__btn view-nav__btn--prev">
                      <IC_Arrow_Prev /> PREV
                    </Link>
                  )}
                  <Link href="/point" className="view-nav__list-btn">
                    <IC_Button_Back />
                  </Link>
                  {pointDetail.btn?.next !== '' && (
                    <Link href={`/point/${pointDetail.btn?.next}`} className="view-nav__btn view-nav__btn--next">
                      NEXT <IC_Arrow_Prev />
                    </Link>
                  )}
                </div>
              </div>
            </Container>
          </ViewNav>
        </DetailWrapper>
      )}
    </>
  )
}

const DetailWrapper = styled.div`
  .container {
    margin-top: 0;
    ${({ theme }) => theme.md`
      margin-top: 40rem;
    `}
  }
`

const IntroTitleWrapper = styled.div`
  margin: 30rem 0;
  .intro {
    &__subtitle {
      font-size: 16rem;
      line-height: 1em;
      color: ${({ theme }) => theme.textColor2};
    }
    &__title {
      margin: 4rem 0 8rem;
      font-size: 40rem;
      font-weight: 600;
    }
    &__tags {
      display: inline-block;
      margin: 0 10rem 10rem 0;
      padding: 7rem 10rem;
      font-size: 16rem;
      line-height: 1;
      color: ${({ theme }) => theme.textColor2};
      background: ${({ theme }) => theme.bgType};
      border-radius: 15px;
    }
  }
`

const IntroContentWrapper = styled.div`
  .intro__content {
    &-item {
      display: flex;
      flex-wrap: wrap;
      ${({ theme }) => theme.md`
        display: block;
      `}
      &:not(:last-child) {
        margin-bottom: 10rem;
        ${({ theme }) => theme.md`
        margin-bottom: 25rem;
      `}
      }
    }
    &-title {
      min-width: 100rem;
      font-weight: 700;
      ${({ theme }) => theme.md`
        margin-bottom: 5rem;
      `}
    }
    &-content {
      max-width: calc(100% - 100rem);
      line-height: 1.8em;
      ${({ theme }) => theme.md`
        max-width: 100%;
      `}
      .point {
        background-image: linear-gradient(120deg, ${({ theme }) => theme.pointColor3} 0%, ${({ theme }) => theme.pointColor4} 100%);
        background-repeat: no-repeat;
        background-size: 100% 50%;
        background-position: 0 88%;
      }
    }
    &-color {
      display: inline-block;
      width: 35rem;
      height: 35rem;
      border-radius: 50%;
      &:not(:last-child) {
        margin-right: 10rem;
      }
    }
  }
`

const KindsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30rem -20rem 0 -20rem;
  ${({ theme }) => theme.md`
    margin: 30rem 0 0;
  `}
  .kind {
    &__item {
      margin: 0 20rem;
      width: calc(33.3333% - 40rem);
      ${({ theme }) => theme.md`
        margin: 0;
        width: 100%;
        &:not(:last-child) {
          margin-bottom: 25rem;
        }
      `}
    }
    &__title {
      padding-bottom: 10rem;
      margin-bottom: 10rem;
      font-size: 20rem;
      font-weight: 700;
      border-bottom: 3px solid ${({ theme }) => theme.borderColor2};
    }
    &__content {
      font-size: 18rem;
    }
  }
`

const ViewBtn = styled.div`
  margin-top: 30rem;
  .view__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250rem;
    padding: 20rem 10rem;
    font-size: 18rem;
    color: ${({ theme }) => theme.bgColor};
    background-color: ${({ theme }) => theme.btnDark2};
    border: 2px solid ${({ theme }) => theme.btnDark2};
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.btnDark2};
      background-color: ${({ theme }) => theme.bgColor};
      svg {
        path {
          stroke: ${({ theme }) => theme.btnDark2};
        }
      }
    }
    svg {
      width: 15rem;
      height: 15rem;
      margin-left: 10rem;
      path {
        stroke: ${({ theme }) => theme.bgColor};
        transition: stroke 0.3s;
      }
    }
  }
`

const ZigzagWrapper = styled.div`
  margin-top: 100rem;
  .zigzag {
    &__title {
      margin-bottom: 30rem;
      text-align: center;
      font-family: 'Montserrat';
      font-size: 32rem;
    }
    &__item{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      ${({ theme }) => theme.md`
        display: block;
      `}
      &:not(:last-child) {
        margin-bottom: 50rem;
      }
      &:nth-child(2n) {
        .zigzag {
          &__img {
            order: 2;
          }
          &__content{
            padding-right: 30rem;
            order: 1;
            ${({ theme }) => theme.md`
              padding-right: 0;
            `}
          }
        }
      }
      &:nth-child(2n-1) {
        .zigzag {
          &__img {
            order: 1;
          }
          &__content{
            padding-left: 30rem;
            order: 2;
            ${({ theme }) => theme.md`
              padding-left: 0;
            `}
          }
        }
      }
    }
    &__img {
      min-width: 60%;
      border: ${({ theme }) => theme.borderColor};
      ${({ theme }) => theme.md`
        min-width: 100%;
      `}
    }
    &__content {
      max-width: 40%;
      ${({ theme }) => theme.md`
        max-width: 100%;
        margin-top: 10rem;
      `}
      &-num {
        font-size: 14rem;
        font-weight: 600;
        color: ${({ theme }) => theme.textColor2};
      }
      &-title {
        margin: 5rem 0 15rem;
        font-size: 20rem;
        font-weight: 700;
        ${({ theme }) => theme.md`
          margin: 0 0 5rem;
        `}
      }
    }
  }
}
`

const MainImgWrapper = styled.div`
  margin: 150rem 0 50rem;
  line-height: 0;
  ${({ theme }) => theme.md`
    margin-top: 100rem;
  `}
  img {
    width: 100%;
    height: auto;
  }
`

const ViewNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.bgColor};
  border-top: ${({ theme }) => theme.borderColor};
  z-index: 100;
  .container {
    margin-top: 0;
  }
  .view-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      position: relative;
      display: -webkit-box;
      width: 100%;
      height: 1.5em;
      font-size: 20rem;
      font-weight: 600;
      line-height: 1.5em;
      word-wrap: break-word;
      overflow: hidden;
      box-sizing: content-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      &-wrap {
        max-width: calc(100% - 160rem);
      }
    }
    &__list-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50rem;
      height: 50rem;
      padding: 1rem;
      background-color: #ff2828;
      transition: background-color 0.3s;
      svg {
        width: 25rem;
        height: 25rem;
        transition: transform 0.3s;
        path {
          fill: #fff;
        }
      }
      &:hover {
        background-color: #222;
        svg {
          transform: rotate(-180deg);
        }
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      height: 50rem;
      padding: 0 15rem;
      font-family: 'Montserrat';
      svg {
        width: 20rem;
        height: 30rem;
        margin: 0 10rem;
        transition: transform 0.3s;
        path {
          fill: ${({ theme }) => theme.btnDark2};
        }
      }
      &-wrap {
        display: flex;
        align-items: center;
      }
      &--prev {
        padding-left: 0;
      }
      &--next {
        padding-right: 0;
        svg {
          transform: rotate(180deg);
        }
      }
      &:hover {
        &.view-nav__btn {
          &--prev svg {
            transform: translateX(-5rem);
          }
          &--next svg {
            transform: translateX(5rem) rotate(180deg);
          }
        }
      }
    }
  }
`
