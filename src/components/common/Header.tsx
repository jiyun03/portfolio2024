import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Hamburger from './Hamburger'
import ThemeToggle from './ThemeToggle'
import Menu from './Nav'

import styled, { keyframes } from 'styled-components'
import IC_LogoHeart from '/public/assets/icons/logo_heart.svg'
import IC_Button_Back from '/public/assets/icons/button_back.svg'

export default function Header() {
  const [menuShow, setMenuShow] = useState<boolean>(false)
  const { route } = useRouter()

  return (
    <HeaderWrapper>
      <div className="header">
        <Link href="/" className="header__link">
          <span>JI</span>
          <span className="heart">
            <IC_LogoHeart />
          </span>
          <span>YUN</span>
        </Link>
        <HeaderRight>
          <ThemeToggle />
          <Hamburger
            show={{
              menuShow: menuShow,
              setMenuShow: setMenuShow,
            }}
          />
        </HeaderRight>
        <Menu
          show={{
            menuShow: menuShow,
            setMenuShow: setMenuShow,
          }}
        />
      </div>
      {route === '/point/[id]' && (
        <PointBackBtn>
          <Link href="/point" className="back__link">
            <span className="back__img">
              <IC_Button_Back />
            </span>
            <span className="back__title">
              목록으로
              <br />
              돌아가기
            </span>
          </Link>
        </PointBackBtn>
      )}
    </HeaderWrapper>
  )
}

const heartbeat = keyframes`
  0%   { transform: scale(1); }
  10%  { transform: scale(1.2); }
  20%  { transform: scale(1); }
  40%  { transform: scale(1); }
  47%  { transform: scale(1.2); }
  55%  { transform: scale(1); }
  62%  { transform: scale(1.2); }
  69%  { transform: scale(1); }
  100% { transform: scale(1); }
`

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  padding: 24rem;
  z-index: 1000;
  ${({ theme }) => theme.sm`
    padding: 15px;
  `}
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 16rem;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.bgHeader};
    box-shadow: ${({ theme }) => theme.headerShadow};
    &__link {
      display: inline-block;
      padding: 10.8rem 32rem;
      font-family: 'Montserrat';
      font-size: 24rem;
      font-weight: 600;
      color: ${({ theme }) => theme.textColor};
    }
  }
  .heart {
    display: inline-block;
    margin: 0 4.8rem;
    animation: ${heartbeat} 2s linear infinite alternate;
    svg {
      width: 16rem;
      height: 16rem;
    }
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const PointBackBtn = styled.div`
  margin-top: 20rem;
  text-align: right;
  ${({ theme }) => theme.md`
    display: none;
  `}
  .back {
    &__link {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: end;
      padding: 10rem 20rem;
      font-size: 14rem;
      line-height: 1.3em;
      &:after {
        content: '';
        position: absolute;
        bottom: 0.2rem;
        left: 50%;
        width: 0;
        height: 3px;
        background-color: ${({ theme }) => theme.textColor3};
        transform: translateX(-50%);
        transition: width 0.3s, background-color 0.3s;
      }
      &:hover {
        &:after {
          width: calc(100% - 40rem);
          background-color: ${({ theme }) => theme.btnDark2};
        }
        .back {
          &__img {
            transform: rotate(-180deg);
            svg {
              path {
                fill: ${({ theme }) => theme.btnDark2};
              }
            }
          }
          &__title {
            color: ${({ theme }) => theme.btnDark2};
          }
        }
      }
    }
    &__img {
      width: 35rem;
      height: 35rem;
      transition: transform 0.3s;
      svg {
        path {
          fill: ${({ theme }) => theme.textColor3};
          transition: fill 0.3s;
        }
      }
    }
    &__title {
      margin-left: 10rem;
      font-weight: 600;
      color: ${({ theme }) => theme.textColor3};
      transition: color 0.3s;
    }
  }
`
