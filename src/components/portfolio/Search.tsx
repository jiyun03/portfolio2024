import { useState, useEffect, useRef, ChangeEvent } from 'react'

import styled from 'styled-components'
import IC_Search from '/public/assets/icons/search.svg'

interface SearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Search({ onChange }: SearchProps) {
  const [inputShow, setInputShow] = useState<boolean>(false)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputShow) {
      setTimeout(() => {
        input.current?.focus()
      }, 100)
    }
  }, [inputShow])

  return (
    <SearchWrapper $show={inputShow}>
      <div className="search-wrap">
        <IC_Search onClick={() => setInputShow(!inputShow)} />
        <div className="search__box">
          <input
            type="text"
            placeholder="타이틀, 내용을 입력해 주세요."
            ref={input}
            onChange={onChange}
            onBlur={(e) => {
              if (e.target.value === '') {
                setInputShow(false)
              }
            }}
          />
        </div>
      </div>
    </SearchWrapper>
  )
}

const SearchWrapper = styled.div<{ $show: boolean }>`
  margin: -16rem;
  ${({ theme }) => theme.sm`
    margin: 0 -16rem;
  `}
  .search {
    &-wrap {
      display: flex;
      align-items: center;
      border-radius: 20px;
      transition: width 0.3s;
      svg {
        padding: 16rem;
        width: 56rem;
        min-width: 2.8rem;
        height: 56rem;
        cursor: pointer;
        ${({ theme }) => theme.sm`
          pointer-events: none;
        `}
        path {
          fill: ${({ theme }) => theme.textColor};
        }
      }
    }
    &__box {
      display: flex;
      align-items: center;
      width: 0;
      height: 32rem;
      background: none;
      border-bottom: ${({ theme }) => theme.borderColor};
      visibility: hidden;
      overflow: hidden;
      transition: width 0.3s, visibility 0.3s;
      ${({ theme }) => theme.sm`
        width: calc(100% - 72rem);
        visibility: visible;
      `}
      input {
        width: 100%;
        height: 32rem;
        // padding-right: 32rem;
        font-size: 16rem;
        color: ${({ theme }) => theme.textColor};
        background: none;
        border: none;
        outline: none;
      }
    }
    &__empty {
      width: 32rem;
      height: 32rem;
      margin-left: -32rem;
      svg {
        padding: 8rem;
        width: 100%;
        min-width: 100%;
        height: 100%;
      }
    }
  }
  ${({ $show }) =>
    $show &&
    `
    .search {
      &__box {
        width: 224rem;
        margin-right: 16rem;
        visibility: visible;
      }
    }
  `}
`
