import styled from 'styled-components'
import IC_SearchNone from '/public/assets/icons/search_none.svg'

interface SearchNoneProps {
  title: string
}

export default function SearchNone({ title = '' }: SearchNoneProps) {
  return (
    <SearchNoneWrap>
      <div className="search-none__icon">
        <IC_SearchNone />
      </div>
      <div className="search-none__title">{title}</div>
    </SearchNoneWrap>
  )
}

const SearchNoneWrap = styled.div`
  width: 100%;
  margin-top: 50rem;
  text-align: center;
  .search-none {
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 130rem;
      height: 130rem;
      margin: auto;
      padding: 45rem;
      background: ${({ theme }) => theme.bgSearchNone};
      border-radius: 50%;
      ${({ theme }) => theme.sm`
        width: 100rem;
        height: 100rem;
        padding: 30rem;
      `}
      svg {
        width: 50rem;
        height: 50rem;
      }
    }
    &__title {
      margin-top: 10rem;
      font-size: 20rem;
      font-weight: 600;
    }
  }
`
