import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

import Container from './Container'

import imgMenuPoint from '@/assets/img/common/menu_point.jpg'
import imgMenuPortfolio from '@/assets/img/common/menu_portfolio.jpg'
import imgMenuAbout from '@/assets/img/common/menu_about.jpg'
import imgMenuContact from '@/assets/img/common/menu_contact.jpg'
import styled, { StyleSheetManager } from 'styled-components'
import isValidProp from '@emotion/is-prop-valid'

interface NavProps {
  show: {
    menuShow: boolean
    setMenuShow: Dispatch<SetStateAction<boolean>>
  }
}

interface MenuItem {
  title: string
  link: string
  img: StaticImageData
}

export default function Nav({ show }: NavProps) {
  const { route } = useRouter()
  const menuList: MenuItem[] = [
    {
      title: 'Point Portfolio',
      link: 'point',
      img: imgMenuPoint,
    },
    {
      title: 'Portfolio',
      link: 'portfolio',
      img: imgMenuPortfolio,
    },
    {
      title: 'About',
      link: 'about',
      img: imgMenuAbout,
    },
    {
      title: 'Contact',
      link: 'contact',
      img: imgMenuContact,
    },
  ]

  return (
    <StyleSheetManager shouldForwardProp={(propName) => isValidProp(propName)}>
      <NavWrapper show={show.menuShow}>
        <Container type="view">
          <MenuWrapper>
            {menuList.map((menu, idx) => {
              return (
                <li key={idx} className="menu__item">
                  <Link
                    href={menu.link}
                    className={`menu__link ${route === `/${menu.link}` ? 's-active' : ''}`}
                    onClick={() => {
                      show.setMenuShow(false)
                    }}
                  >
                    <span className="menu__title">{menu.title}</span>
                    <div
                      className="menu__img"
                      style={{
                        background: `url('${menu.img.src}') no-repeat center`,
                        backgroundSize: 'cover',
                      }}
                    />
                  </Link>
                </li>
              )
            })}
          </MenuWrapper>
        </Container>
      </NavWrapper>
    </StyleSheetManager>
  )
}

const NavWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 192rem 0;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.bgColor};
  visibility: hidden;
  opacity: 0;
  z-index: 900;
  transition: opacity 0.3s;
  text-align: center;
  [type='view'] {
    margin-top: 0;
  }
  ${(props) =>
    props.show &&
    `
    visibility: visible;
    opacity: 1;
    .menu__item {
      .menu__link {
        &.s-active {
          &:after {
            width: 100%;
            transition: width 1s 0.6s;
          }
        }
      }
      .menu__title {
        height: 92rem;
        opacity: 1;
      }
    }
  `}
  ${(props) =>
    props.show &&
    props.theme.md`
    .menu__item {
      .menu__title {
        height: 57.6rem;
      }
      .menu__img {
        display: none;
      }
    }
  `}
`

const MenuWrapper = styled.ul`
  .menu {
    &__item {
      display: flex;
      justify-content: center;
      &:nth-child(odd) {
        .menu__link {
          &:hover {
            .menu__img {
              transform: translate3d(48rem, -50%, 0) rotate(0deg);
            }
          }
        }
        .menu__img {
          right: 100%;
          transform: translate3d(-48rem, -50%, 0) rotate(-10deg);
          transform-origin: bottom left;
        }
      }
      &:nth-child(2n) {
        .menu__link {
          &:hover {
            .menu__img {
              transform: translate3d(-48rem, -50%, 0) rotate(0deg);
            }
          }
        }
        .menu__img {
          left: 100%;
          transform: translate3d(-48rem, -50%, 0) rotate(-10deg);
          transform-origin: top right;
        }
      }
    }
    &__link {
      position: relative;
      display: inline-block;
      padding: 4.8rem 24rem;
      &:after {
      }
      &.s-active {
        &:after {
          content: '';
          position: absolute;
          left: 0;
          width: 0;
          bottom: 25rem;
          width: 0;
          height: 30rem;
          background-color: ${({ theme }) => theme.pointColor2};
          transform: skewX(-15deg);
        }
      }
      &:hover {
        .menu {
          &__title {
            transform: skewX(-15deg);
          }
          &__img {
            opacity: 1;
          }
        }
      }
    }
    &__title {
      position: relative;
      display: inline-block;
      height: 0;
      opacity: 0;
      overflow: hidden;
      font-family: 'SaolDisplay';
      font-size: 76.8rem;
      line-height: 1.2;
      z-index: 1;
      transition: height 1.2s cubic-bezier(0.345, 0, 0, 1), opacity 1.2s cubic-bezier(0.345, 0, 0, 1),
        transform 0.3s cubic-bezier(0.345, 0, 0, 1);
      ${({ theme }) => theme.md`
        font-size: 48rem;
      `}
    }
    &__img {
      width: 272rem;
      height: 384rem;
      position: absolute;
      top: 50%;
      opacity: 0;
      pointer-events: none;
      transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1), opacity 0.4s cubic-bezier(0.86, 0, 0.07, 1);
      @media screen and (max-height: 750px) {
        display: none;
      }
    }
  }
`
