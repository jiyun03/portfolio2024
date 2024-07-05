import { Dispatch, SetStateAction } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade'

import styled from 'styled-components'

interface HamburgerProps {
  show: {
    menuShow: boolean
    setMenuShow: Dispatch<SetStateAction<boolean>>
  }
}

export default function Hamburger({ show }: HamburgerProps) {
  return (
    <HamburgerWrapper
      $show={show.menuShow || false}
      onClick={() => {
        const scrollTargetElement = document.querySelector('body')

        show.setMenuShow(!show.menuShow)
        if (show.menuShow) {
          enableBodyScroll(scrollTargetElement as HTMLElement)
        } else {
          disableBodyScroll(scrollTargetElement as HTMLElement)
        }
      }}
    >
      <button className="hamburger">
        <span className="hamburger__item top"></span>
        <span className="hamburger__item middle"></span>
        <span className="hamburger__item bottom"></span>
      </button>
    </HamburgerWrapper>
  )
}

const HamburgerWrapper = styled.div<{ $show: boolean }>`
  position: relative;
  width: 56rem;
  height: 60rem;
  padding: 20rem 16rem;
  cursor: pointer;
  z-index: 1000;
  box-sizing: border-box;
  .hamburger {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    &__item {
      position: absolute;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.textColor};
      border-radius: 15px;
      transition: top 0.25s 0.25s, transform 0.25s, width 0.25s, opacity 0.25s;
      transform-origin: center;
      &.top {
        top: 0;
        width: 70%;
      }
      &.middle {
        top: calc(50% - 1.5px);
      }
      &.bottom {
        left: initial;
        right: 0;
        top: calc(100% - 3px);
        width: 80%;
      }
    }
  }
  &:hover {
    .hamburger {
      .hamburger__item {
        width: 100%;
      }
    }
  }

  ${({ $show }) =>
    $show &&
    `
      .hamburger {
        .hamburger__item {
          top: calc(50% - 2px);
          width: 100%;
          transition: top 0.25s, transform 0.25s 0.25s, opacity 0.25s;
          &.top {
            transform: rotate(45deg);
          }
          &.middle {
            opacity: 0;
          }
          &.bottom {
            transform: rotate(135deg);
          }
        }
      }
    `}
`
