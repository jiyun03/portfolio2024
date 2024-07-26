import Link from 'next/link'

import styled from 'styled-components'

export default function Custom404() {
  return (
    <ErrorWrapper>
      <p className="error__caption">JIYUN&apos;s PORTFOLIO</p>
      <h1 className="error__title">404</h1>
      <p className="error__subtitle">존재하지 않는 페이지 입니다.</p>
      <Link href="/" className="error__link">
        메인으로
      </Link>
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .error {
    &__caption {
      font-family: 'Montserrat';
    }
    &__title {
      font-family: 'Montserrat';
      font-size: 80rem;
      line-height: 1;
    }
    &__subtitle {
      margin-top: 10rem;
      font-size: 20rem;
    }
    &__link {
      display: inline-block;
      margin-top: 30rem;
      padding: 10rem 40rem;
      font-size: 20rem;
      font-weight: 600;
      border: ${({ theme }) => theme.borderColor};
      border-radius: 30rem;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
      transition: background-color 0.3s;
      &:hover {
        background-color: ${({ theme }) => theme.pointColor4};
      }
    }
  }
`
