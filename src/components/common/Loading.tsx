import styled from 'styled-components'
import IC_Loading from '/public/assets/icons/loading.svg'

export default function Loading() {
  return (
    <LoadingWrap>
      <IC_Loading />
    </LoadingWrap>
  )
}

const LoadingWrap = styled.div`
  width: 100%;
  svg {
    display: block;
    width: 110rem;
    margin: auto;
  }
`
