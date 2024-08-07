import Link from 'next/link'
import { ItemProps } from '@/types/portfolio'

import Ratio from '@/components/common/Ratio'

import styled, { keyframes } from 'styled-components'
import IC_Cog from '/public/assets/icons/cog.svg'

export default function ListsItem({ item }: ItemProps) {
  const Content = () => {
    const types: string[] = item.type.split('|')
    const contents = [
      {
        name: '기간',
        content: item.date,
      },
      {
        name: '작업도',
        content: item.works,
      },
      {
        name: '기술스택',
        class: 'type',
        content: types.map((type, idx) => {
          return <span key={idx}>{type}</span>
        }),
      },
    ]

    return (
      <>
        <div className="lists__img">
          <Ratio ratio="3_2" src={`/assets/img/portfolio/${item.name}/${item.name}-main.jpg`} />
          {item.status === 'off' && (
            <DimWrapper className="lists__dim-wrap">
              <div className="lists__dim">
                <IC_Cog />
                <span className="lists__dim-title">접속불가</span>
              </div>
            </DimWrapper>
          )}
        </div>
        <div className="lists__title-wrap">
          <div className="lists__title">{item.title}</div>
          <div className="lists__subtitle">{item.subtitle}</div>
        </div>
        <div className="lists__content-wrap">
          {contents.map((content, idx) => {
            return (
              <div key={idx} className="lists__content">
                <div className="lists__content-item lists__content-item--title">{content.name}</div>
                <div
                  className={`lists__content-item lists__content-item--content ${
                    content.class ? `lists__content-item--${content.class}` : ''
                  }`}
                >
                  {content.content}
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <ListsItemWrapper className="lists__item">
      {item.status === 'on' ? (
        <Link href={item.link} target="_blank" className="lists__link">
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </ListsItemWrapper>
  )
}

const rotateInfinite = keyframes`
  0%   { transform: rotate(0); }
  100% { transform: rotate(365deg); }
`

const ListsItemWrapper = styled.div`
  margin-bottom: 80rem;
  .lists {
    &__link {
      display: block;
      transition: transform 0.3s;
      &:hover {
        transform: translateY(-10px);
        .lists__img {
          box-shadow: ${({ theme }) => theme.listsShadow};
        }
      }
    }
    &__img {
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      transition: box-shadow 0.3s;
    }
    &__title {
      font-size: 20rem;
      font-weight: 700;
      &-wrap {
        margin-top: 20rem;
      }
    }
    &__subtitle {
      margin-top: 10.5rem;
      font-size: 16rem;
      color: ${({ theme }) => theme.textColor2};
      line-height: 1.5;
    }
    &__content {
      display: flex;
      &:not(:last-child) {
        margin-bottom: 3.2rem;
        ${({ theme }) => theme.sm`
          margin-bottom: 5rem;
        `}
      }
      &-item {
        &--title {
          font-weight: 700;
          width: 96rem;
          max-width: 96rem;
        }
        &--type {
          span {
            display: inline-block;
            margin-right: 8rem;
            padding: 4.8rem 8rem;
            font-size: 13rem;
            line-height: 1;
            color: ${({ theme }) => theme.textColor2};
            background: ${({ theme }) => theme.bgType};
            border-radius: 15px;
            ${({ theme }) => theme.lg`
              font-size: 14rem;
            `}
          }
        }
      }
      &-wrap {
        margin-top: 16rem;
        font-size: 16rem;
      }
    }
  }
`

const DimWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .lists__dim {
    svg {
      width: 21.12rem;
      height: 21.12rem;
      vertical-align: middle;
      animation: ${rotateInfinite} 5s linear infinite;
      ${({ theme }) => theme.xl`
        width: 2vw;
        height: 2vw;
      `}
      ${({ theme }) => theme.md`
        width: 5vw;
        height: 5vw;
      `}
    }
    &-title {
      display: inline-block;
      margin-left: 10rem;
      font-size: 21rem;
      color: #ffffff;
      vertical-align: middle;
      ${({ theme }) => theme.xl`
        font-size: 2vw;
      `}
      ${({ theme }) => theme.md`
        font-size: 5vw;
      `}
    }
  }
}
`
