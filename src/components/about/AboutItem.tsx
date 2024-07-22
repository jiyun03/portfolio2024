import { ReactNode } from 'react'
import Image from 'next/image'
import { AboutItemArray } from '@/types/about'

import styled from 'styled-components'

interface AboutItemProps {
  number: string
  name: string
  item: AboutItemArray
  children?: ReactNode
}

export default function AboutItem({ number, name, item, children }: AboutItemProps) {
  const itemKey = Object.keys(item)[0] as keyof AboutItemArray
  const itemContent = item[itemKey]

  return (
    <div className={`about__item about__item--${itemKey}`}>
      <ItemTitleWrapper>
        <div className="about__subtitle">{number}</div>
        <div className="about__title">{name.toUpperCase()}</div>
      </ItemTitleWrapper>
      <ItemContentWrapper className="about__content-wrap">
        {children && children}
        <div className="about__content">
          {itemContent?.map((el) => (
            <div className="about__content-item" key={el.title}>
              <div className="about__content__title">{el.title}</div>
              <div className="about__content__content">
                {Array.isArray(el.content)
                  ? el.content.map((elContent, index) => (
                      <div className="content-item" key={index}>
                        {typeof elContent === 'object' && elContent.subtitle && (
                          <div className="content-item__subtitle">{elContent.subtitle}</div>
                        )}
                        {typeof elContent === 'string' && (
                          <div className="content-item__img">
                            <Image src={`/assets/img/about/skill/${elContent}.svg`} width={0} height={0} sizes="100%" alt={elContent} />
                          </div>
                        )}
                        <div className="content-item__title">
                          {typeof elContent === 'string' ? elContent.toUpperCase() : elContent.title}
                        </div>
                      </div>
                    ))
                  : el.content}
              </div>
            </div>
          ))}
        </div>
      </ItemContentWrapper>
    </div>
  )
}

const ItemTitleWrapper = styled.div`
  margin-bottom: 16rem;
  font-family: 'Montserrat';
  .about {
    &__subtitle {
      color: ${({ theme }) => theme.textColor4};
    }
    &__title {
      font-size: 24rem;
    }
  }
`

const ItemContentWrapper = styled.div`
  .about {
    &__content {
      &-item {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        margin-bottom: 30rem;
        font-size: 18rem;
        ${({ theme }) => theme.sm`
          display: block;
        `}
        .content {
          &-item {
            &:not(:last-child) {
              margin-bottom: 10rem;
              ${({ theme }) => theme.sm`
                margin-bottom: 25rem;
              `}
            }
            &__subtitle {
              font-family: 'Montserrat', 'AppleSDGothicNeo';
              font-size: 14rem;
              color: ${({ theme }) => theme.textColor3};
            }
            &__img {
              img {
                width: 30rem;
                height: 30rem;
              }
            }
          }
        }
      }
      &__title {
        flex: 0 0 20%;
        max-width: 20%;
        padding: 0 5px;
        ${({ theme }) => theme.sm`
          max-width: 100%;
          margin-bottom: 12rem;
          font-weight: 700;
        `}
      }
      &__content {
        flex: 0 0 80%;
        max-width: 80%;
        padding: 0 5px;
        font-weight: 400;
        ${({ theme }) => theme.sm`
          max-width: 100%;
        `}
      }
    }
  }
`
