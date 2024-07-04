import Link from 'next/link'
import { PointItemProps } from '@/types/point'

import Ratio from '@/components/common/Ratio'

import styled, { keyframes } from 'styled-components'
import IC_Arrow_right from '/public/assets/icons/arrow_right.svg'

export default function PointItem({ item, index }: PointItemProps) {
  const tag: Array<string> = item.title.tag.split('|')

  return (
    <PointItemWrapper>
      <Link href={`point/${item.name}`} className={`point__link point__link--${item.name}`}>
        <div className="point__img">
          <Ratio ratio="1_1" src={`/assets/img/portfolio/${item.name}/${item.name}.jpg`} />
          <div className="point__content">
            <div className="point__title">{item.title.title}</div>
            <button className="point__btn">
              <IC_Arrow_right />
            </button>
          </div>
        </div>
        <div className="point__tags-wrap">
          {tag.length !== 0 &&
            tag.map((tags, idx) => {
              return (
                <span key={idx} className="point__tags">
                  {tags}
                </span>
              )
            })}
        </div>
      </Link>
    </PointItemWrapper>
  )
}

const arrowHover = keyframes`
	0%{
		opacity: 1;
		transform: translateX(0);
	}
	40%{
		opacity: 0;
		transform: translateX(10px);
	}
	60%{
		opacity: 0;
		transform: translateX(-10px);
	}
	100%{
		opacity: 1;
		transform: translateX(0);
	}
}
`

const PointItemWrapper = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 10px;
  ${({ theme }) => theme.xl`
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 20px;
  `}
  ${({ theme }) => theme.md`
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 20px;
  `}
  .point {
    &__link {
      display: block;
      transition: transform 0.3s;
      &:hover {
        transform: translateY(-30px);
        ${({ theme }) => theme.xl`
          transform: translateY(-10px);
        `}
        .point__img {
          box-shadow: ${({ theme }) => theme.listsShadow};
        }
        .point__btn {
          svg {
            animation: ${arrowHover} 0.7s cubic-bezier(0.47, 0, 0.75, 0.72);
          }
        }
      }
    }
    &__img {
      position: relative;
      display: block;
      border-radius: 15px;
      overflow: hidden;
      transition: box-shadow 0.3s;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: linear-gradient(0, rgba(0, 0, 0, 0.25), transparent 20%);
      }
    }
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 30rem 25rem 30rem;
      z-index: 1;
      ${({ theme }) => theme.sm`
        padding: 0 25rem 20rem 25rem;
      `}
    }
    &__title {
      width: calc(100% - 80rem);
      font-size: 30rem;
      font-weight: 600;
      color: #fff;
      ${({ theme }) => theme.sm`
        font-size: 25rem;
      `}
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
      &-wrap {
        margin-top: 15rem;
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60rem;
      height: 60rem;
      border-radius: 50%;
      background: #fff;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      ${({ theme }) => theme.sm`
        width: 45rem;
        height: 45rem;
      `}
      svg {
        width: 35rem;
        ${({ theme }) => theme.sm`
          width: 25rem;
        `}
      }
    }
  }
`
