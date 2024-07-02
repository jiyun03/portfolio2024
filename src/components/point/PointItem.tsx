import Link from 'next/link'

import Ratio from '@/components/common/Ratio'

import styled from 'styled-components'

interface TitleType {
  subtitle: string
  title: string
  tag: string
  color: string
  content: string
  feel: string
}

interface Kind {
  date: string
  work: string
  type: string
  url: string
}

interface ZigzagItem {
  title: string
  content: string
}

interface Btn {
  prev?: string
  next: string
}

interface ProjectDetails {
  name: string
  title: TitleType
  kind: Kind
  zigzag: Record<string, ZigzagItem>
  btn: Btn
}

interface PointItemProps {
  item: ProjectDetails
  index: number
}

export default function PointItem({ item, index }: PointItemProps) {
  const tag: Array<string> = item.title.tag.split('|')

  return (
    <PointItemWrapper>
      <Link href={`point/${item.name}`} className={`point__link point__link--${item.name}`}>
        <div className="point__img">
          <Ratio ratio="1_1" src={`/assets/img/portfolio/${item.name}/${item.name}.jpg`} />
        </div>
        <div className="point__title-wrap">
          <div className="point__title">{item.title.title}</div>
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
        </div>
      </Link>
    </PointItemWrapper>
  )
}

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
      position: relative;
      display: block;
      border-radius: 15px;
      overflow: hidden;
    }
    &__img {
      display: block;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: linear-gradient(0, rgba(0, 0, 0, 0.25), transparent 15%);
      }
    }
    &__title {
      font-size: 20rem;
      font-weight: 600;
      &-wrap {
        position: absolute;
        left: 30rem;
        bottom: 30rem;
        color: #fff;
      }
    }
    &__tags {
      display: inline-block;
      margin-right: 8rem;
      padding: 4.8rem 8rem;
      font-size: 13rem;
      line-height: 1;
      color: ${({ theme }) => theme.textColor2};
      background: ${({ theme }) => theme.bgType};
      border-radius: 15px;
    }
  }
`
