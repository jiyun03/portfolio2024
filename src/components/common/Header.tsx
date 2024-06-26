import { useState } from 'react'
import Link from 'next/link'

import Hamburger from './Hamburger'
import ThemeToggle from './ThemeToggle'
import Menu from './Nav'

import styled, { keyframes } from 'styled-components'
import IC_LogoHeart from '/public/assets/icons/logo_heart.svg'

export default function Header() {
  const [menuShow, setMenuShow] = useState<boolean>(false)

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
    top: 15px;
    margin: 15px;
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
