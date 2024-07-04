import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ProjectDetails } from '@/types/point'
import { parseHtmlString } from '@/utils'

import Container from '@/components/common/Container'
import Ratio from '@/components/common/Ratio'
import Loading from '@/components/common/Loading'

import styled from 'styled-components'
import IC_Button_Out from '/public/assets/icons/button_out.svg'

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
      console.log(data)
    }

    if (queryId) {
      fetchProject()
    }
  }, [queryId])

  return (
    <Container type="view">
      {pointDetailLoading ? (
        <Loading />
      ) : (
        <>
          {pointDetail && (
            <>
              <Ratio ratio="3_1" src={`/assets/img/portfolio/${queryId}/${queryId}-header.jpg`} />
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
                      colors.map((color, idx) => (
                        <span key={idx} className="intro__content-color" style={{ backgroundColor: `#${color}` }} />
                      ))}
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
            </>
          )}
        </>
      )}
    </Container>
  )
}

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
      &:not(:last-child) {
        margin-bottom: 10rem;
      }
    }
    &-title {
      min-width: 100rem;
      font-weight: 700;
    }
    &-content {
      max-width: calc(100% - 100rem);
      line-height: 1.8em;
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
  .kind {
    &__item {
      margin: 0 20rem;
      width: calc(33.3333% - 40rem);
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
    color: #ffffff;
    background-color: #222222;
    border: 2px solid #222222;
    svg {
      width: 15rem;
      height: 15rem;
      margin-left: 10rem;
    }
  }
`
