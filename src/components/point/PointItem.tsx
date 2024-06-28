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
          <div className="points__tags-wrap">
            {tag.length !== 0 &&
              tag.map((tags, idx) => {
                return (
                  <span key={idx} className="points__tags">
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
  // margin-bottom: 200rem;
  .point {
    &__link {
      position: relative;
    }
    &__img {
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
      font-size: 42rem;
      font-weight: 600;
      &-wrap {
        position: absolute;
        left: 30rem;
        bottom: 30rem;
        color: ${({ theme }) => theme.bgColor};
      }
    }
  }
`
