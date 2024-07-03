import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProjectDetails } from '@/types/point'

import Container from '@/components/common/Container'
import Ratio from '@/components/common/Ratio'
import Loading from '@/components/common/Loading'

import styled from 'styled-components'

export default function Page() {
  const router = useRouter()
  const { id: queryId } = router.query
  const [pointDetail, setPointDetail] = useState<ProjectDetails | null>(null)
  const [pointDetailLoading, setPointDetailLoading] = useState<boolean>(true)

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
              </IntroTitleWrapper>
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
  }
`
