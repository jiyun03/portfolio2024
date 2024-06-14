import { ChangeEvent } from 'react'

import styled from 'styled-components'

interface SortProps {
  content: {
    name: string
    item: {
      id: string
      name: string
    }[]
  }[]
  sort: {
    sortDefault: {
      id: string
      name: string
      item?: Array<string>
    }[]
    sortArray: {
      id: string
      name: string
      item?: Array<string>
    }[]
    setSortArray: React.Dispatch<
      React.SetStateAction<
        {
          id: string
          name: string
          item?: Array<string>
        }[]
      >
    >
  }
}

export default function Sort({ content, sort }: SortProps) {
  const sortDefault = sort.sortDefault
  const sortArray = sort.sortArray
  const setSortArray = sort.setSortArray

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, idx: number, keyword: string) => {
    // 기존 배열 유지
    sortDefault[idx].item = sortArray[idx].item
    if (!sortDefault[idx].item) {
      sortDefault[idx].item = []
    }
    if (e.target.checked) {
      // 체크 된 값 추가
      sortDefault[idx].item?.push(keyword)
    } else {
      // 체크 삭제 된 값 filter
      const sortFilter = sortDefault[idx].item?.filter((data) => data !== keyword)
      sortDefault[idx].item = sortFilter
    }
    const sortChange = sortArray.map((sortItem, sortItemIdx) => {
      if (idx === sortItemIdx) {
        return {
          ...sortItem,
          item: sortDefault[idx].item,
        }
      } else {
        return {
          ...sortItem,
          item: sortArray[sortItemIdx].item,
        }
      }
    })
    setSortArray(sortChange)
  }

  return (
    <SortWrapper className="sort">
      {content.map((item, idx) => {
        return (
          <div className="sort__item" key={idx}>
            <div className="sort__name">{item.name}</div>
            <div className="sort__content">
              {item.item.map((check, idxCheck) => {
                return (
                  <div className="sort__checkbox-wrap" key={idxCheck}>
                    <input
                      type="checkbox"
                      id={check.id}
                      name={check.id}
                      className="sort__checkbox"
                      onChange={(e) => handleCheckboxChange(e, idx, check.id)}
                    />
                    <label htmlFor={check.id} className="sort__label">
                      {check.name}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </SortWrapper>
  )
}

const SortWrapper = styled.div`
  .sort {
    &__item {
      display: flex;
      ${({ theme }) => theme.sm`
        display: block;
      `}
      &:not(:last-child) {
        ${({ theme }) => theme.sm`
          margin-bottom: 15rem;
        `}
      }
    }
    &__name {
      padding-top: 4rem;
      min-width: 100rem;
      font-weight: 400;
    }
    &__content {
      display: flex;
      flex-wrap: wrap;
    }
    &__checkbox,
    &__label {
      cursor: pointer;
    }
    &__checkbox {
      display: none;
      &:checked {
        + .sort__label {
          &:after {
            background-color: ${({ theme }) => theme.borderColorSort};
            transform: scale(0.5);
          }
        }
      }
    }
    &__label {
      display: inline-block;
      position: relative;
      padding: 5rem 16rem 5rem calc(0.8em + 7px);
      ${({ theme }) => theme.sm`
        padding-top: 2rem;
        padding-bottom: 2rem;
      `}
      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: calc((0% - (100% - 3em)) - 4%);
        width: calc(0.8em + 2px);
        height: calc(0.8em + 2px);
        border-radius: 0;
        background-color: transparent;
        border: 1px solid transparent;
        box-sizing: border-box;
        z-index: 0;
        ${({ theme }) => theme.sm`
          top: calc((0% - (100% - 2.45em)) - 4%);
        `}
      }
      &:before {
        background-color: #fff;
        border-width: calc(1em / 10);
        border-color: ${({ theme }) => theme.borderColorSort};
        border-radius: 2px;
      }
    }
  }
`
