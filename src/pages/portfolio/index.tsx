import { useState, useEffect, useRef, useCallback } from 'react'
import { ListProps, SortItem, SortContent } from '@/types/portfolio'
import { lock, unlock } from 'tua-body-scroll-lock'

import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import SearchNone from '@/components/common/SearchNone'
import Loading from '@/components/common/Loading'
import Portal from '@/components/common/Portal'
import ListsItem from '@/components/portfolio/ListItem'
import Search from '@/components/portfolio/Search'
import Sort from '@/components/portfolio/Sort'
import FloatButton from '@/components/portfolio/FloatButton'

import styled, { keyframes } from 'styled-components'
import IC_ButtonMore from '/public/assets/icons/button_more.svg'
import IC_Filter from '/public/assets/icons/filter.svg'
import IC_SortClose from '/public/assets/icons/sort_close.svg'

export default function Index() {
  const defaultLimit: number = 6
  const sortDefault: SortItem[] = [
    {
      id: 'company',
      name: '',
      item: [],
    },
    {
      id: 'year',
      name: '',
      item: [],
    },
    {
      id: 'type',
      name: '',
      item: [],
    },
  ]
  // 전체 리스트
  const [lists, setLists] = useState<ListProps[]>([])
  const [listsLoading, setListsLoading] = useState<boolean>(true)
  // sort 된 리스트 배열 (검색, sort)
  const [listsSort, setListsSort] = useState<ListProps[]>([])
  const [listsSortSearch, setListsSortSearch] = useState<string>('')
  const [listsSortYear, setListsSortYear] = useState<SortItem[]>([])
  const [listsSortType, setListsSortType] = useState<SortItem[]>([])
  // 리스트 limit 값 배열
  const [listsLimit, setListsLimit] = useState<number>(defaultLimit)
  // sort 저장용 배열
  const [sortArray, setSortArray] = useState<SortItem[]>(sortDefault)
  const sortContents: SortContent[] = [
    {
      name: '회사별',
      item: [
        { id: 'individual', name: '개인' },
        { id: 'dfy', name: 'DFY' },
        { id: 'sprint', name: '스프린트' },
      ],
    },
    {
      name: '연도별',
      item: listsSortYear,
    },
    {
      name: '타입별',
      item: listsSortType,
    },
  ]
  // float
  const floatRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [float, setFloat] = useState<boolean>(false)
  const [floatClick, setFloatClick] = useState<boolean>(false)

  // [더보기] 더보기 버튼
  const listsMore = (): void => {
    if (Object.values(listsSort).length > listsLimit) {
      setListsLimit(listsLimit + 6)
    } else {
      setListsLimit(defaultLimit)
    }
  }

  // 검색어 state 저장
  const searchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyword: string = e.target.value.toLowerCase()
    setListsSortSearch(keyword)
  }

  useEffect(() => {
    // sort 리스트
    const sortLists: ListProps[][] = sortArray.reduce((acc: ListProps[][], sort: SortItem) => {
      const filteredLists: ListProps[] = Object.values(lists).filter((list: ListProps) => {
        const date: string = list.date.split('.')[0]
        const type: string[] = list.type.split('|')

        return (
          sort.item!.includes(list.company) || sort.item!.includes(date) || sort.item!.filter((x: string) => type.includes(x)).length !== 0
        )
      })
      return [...acc, filteredLists]
    }, [])

    const sortFlat: ListProps[] = sortLists.flat()

    // sort id 별 개수 체크
    const sortCountCheck = (): number => {
      let count: number = 0
      for (let index = 0; index < sortLists.length; index++) {
        if (sortLists[index].length > 0) count++
      }
      return count
    }

    // [리팩토링] sort 중복 검수 리팩토링 필요
    const sortDuplicatesFind: ListProps[] =
      sortCountCheck() > 1
        ? sortFlat
            .filter((item: ListProps, index: number) => {
              return sortFlat.indexOf(item) !== index
            })
            .sort((a: ListProps, b: ListProps) => new Date(b.date).getTime() - new Date(a.date).getTime())
        : sortFlat

    const sortDuplicates: ListProps[] =
      sortCountCheck() > 2
        ? sortDuplicatesFind.filter((item: ListProps, index: number) => {
            return sortDuplicatesFind.indexOf(item) !== index
          })
        : sortDuplicatesFind

    // [검색] input에 작성한 타이틀, 서브타이틀 검색
    const searchLists: ListProps[] = sortFlat.length === 0 ? lists : sortDuplicates
    const search: ListProps[] =
      listsSortSearch !== ''
        ? Object.values(searchLists).filter((list: ListProps) => {
            return list.title.toLowerCase().includes(listsSortSearch) || list.subtitle.toLowerCase().includes(listsSortSearch)
          })
        : searchLists

    setListsSort(search)
    setListsLimit(defaultLimit)
  }, [sortArray, lists, listsSortSearch])

  useEffect(() => {
    // [리스트] sort 된 리스트 목록 state 업데이트
    setListsSort(lists)

    if (lists.length !== 0) {
      // 연도, 타입 설정
      const yearsMap: Map<string, SortItem> = new Map()
      const typesMap: Map<string, SortItem> = new Map()

      Object.values(lists).forEach((item: ListProps) => {
        const year: string = item.date.split('.')[0]
        const type: string[] = item.type.split('|')
        yearsMap.set(year, { id: year, name: `${year}년` })
        type.forEach((itemType: string) => {
          typesMap.set(itemType, { id: itemType, name: itemType })
        })
      })
      const yearsArray = Array.from<SortItem>(yearsMap.values())
      const typesArray = Array.from<SortItem>(typesMap.values())

      setListsSortYear(yearsArray)
      setListsSortType(typesArray)
    }
  }, [lists])

  // [float] scroll
  const floatScroll = useCallback((): void => {
    if (floatRef.current && floatRef.current.firstElementChild instanceof HTMLElement) {
      const floatHeight = floatRef.current.firstElementChild.offsetHeight
      const floatBottom = floatRef.current.offsetTop + floatHeight
      if (window.scrollY > floatBottom + 25) {
        setFloat(true)
      } else {
        if (window.scrollY !== 0) {
          setFloat(false)
          setFloatClick(false)
        }
      }
    }
  }, [])

  const floatClickState = (): void => {
    setFloatClick(!floatClick)
  }

  // [resize]
  const resizeSetting = useCallback((): void => {
    // view 설정
    if (window.innerWidth <= 600) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }

    // float
    setFloatClick(false)
    if (floatRef.current && floatRef.current.firstElementChild instanceof HTMLElement) {
      const floatHeight = floatRef.current.firstElementChild.offsetHeight
      floatRef.current!.style.height = `${floatHeight}px`
    }
  }, [])

  // [리스트] 리스트 json 데이터 불러오기
  useEffect(() => {
    const dataFetch = async (): Promise<void> => {
      const response = await fetch('/api/portfolio')
      const portfolioLists = await response.json()
      setLists(portfolioLists)
      setListsLoading(false)
    }
    dataFetch()
  }, [])

  // resize 세팅 초기 실행
  useEffect(() => {
    setTimeout(() => {
      resizeSetting()
    }, 500)
  }, [resizeSetting])

  // [float] scroll, resize
  useEffect(() => {
    window.addEventListener('scroll', floatScroll)
    window.addEventListener('resize', resizeSetting)
    return () => {
      window.removeEventListener('scroll', floatScroll)
      window.removeEventListener('resize', resizeSetting)
    }
  }, [floatScroll, resizeSetting])

  useEffect(() => {
    if (floatClick && floatRef.current) {
      floatRef.current.classList.add('active')
    } else {
      floatRef.current!.classList.remove('active')
    }

    // scrollLock
    const scrollTargetElement = document.querySelector('.sort')
    if (scrollTargetElement instanceof HTMLElement) {
      if (isMobile && floatClick) {
        lock(scrollTargetElement, { overflowType: 'clip' })
      } else {
        unlock(scrollTargetElement)
      }
    }
  }, [floatClick, isMobile])

  return (
    <Container>
      {/* Title */}
      <Title
        content={{
          title: '프로젝트 목록',
          subtitle: '재직 중 작업한 프로젝트 목록입니다.\n모든 사이트는 반응형으로 제작되었습니다 :)',
        }}
      />
      {/* Tool */}
      <ToolWrapper>
        <div className="tool-wrap" ref={floatRef}>
          <div className="tool">
            {floatClick && (
              <div className="tool__close" onClick={floatClickState}>
                <IC_SortClose />
              </div>
            )}
            <div className="tool__title-wrap">
              <div className="tool__title">정렬</div>
              <Search onChange={searchChange} />
            </div>
            <Sort
              content={sortContents}
              sort={{
                sortDefault: sortDefault,
                sortArray: sortArray,
                setSortArray: setSortArray,
              }}
            />
          </div>
        </div>
        <div className="total">
          총 <span className="total__num">{listsSort.length}</span>개
        </div>
      </ToolWrapper>
      {/* List */}
      <ListsWrapper>
        <div className="lists">
          {!listsLoading ? (
            Object.entries(listsSort).length !== 0 ? (
              <div className="lists-wrap">
                {Object.entries(listsSort).map((item, idx) => {
                  if (idx > listsLimit - 1) return null
                  return <ListsItem key={item[0]} item={item[1]} />
                })}
              </div>
            ) : (
              <SearchNone title="검색 결과가 없습니다." />
            )
          ) : (
            <Loading />
          )}
        </div>
        {Object.values(listsSort).length > defaultLimit - 1 && Object.values(listsSort).length > listsLimit && (
          <ListsMore>
            <button type="button" className="more__btn" onClick={listsMore}>
              <IC_ButtonMore /> <span className="more__title">더보기</span>
            </button>
          </ListsMore>
        )}
      </ListsWrapper>
      {/* Float */}
      <FloatButton
        icon={<IC_Filter />}
        action={{
          action: float,
          click: floatClickState,
        }}
      />
      {isMobile && floatClick && <Portal dimmed={floatClickState} />}
    </Container>
  )
}

const bounceUp = keyframes`
  0%   { opacity:0; transform: translate(-50%, 100%); }
  30%  { transform: translate(-50%, -10%); }
  60%  { opacity:1; transform: translate(-50%, 10%); }
  100% { transform: translate(-50%, 0); }
`

const showUp = keyframes`
  0%   { transform: translate(-50%, 100%); }
  100% { transform: translate(-50%, 0); }
`

const ToolWrapper = styled.div`
  margin-bottom: 16rem;
  .tool {
    position: relative;
    padding: 25rem;
    font-size: 16rem;
    background-color: ${({ theme }) => theme.bgSort};
    border-radius: 20px;
    &-wrap {
      position: relative;
      &:not(.active) {
        height: auto !important;
      }
      &.active {
        .tool {
          position: fixed;
          bottom: 20rem;
          left: 50%;
          width: 50%;
          border: ${({ theme }) => theme.borderColor};
          transform: translate(-50%, 0);
          animation: ${bounceUp} 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
          z-index: 1200;
          ${({ theme }) => theme.lg`
            width: 70%;
          `}
          ${({ theme }) => theme.sm`
            bottom: 0;
            width: 100%;
            background-color: ${theme.bgSortSm};
            border-radius: 20px 20px 0 0;
            border: none;
            box-shadow: 0 -10px 20px rgba(0,0,0,0.15);
            animation: ${showUp} 0.3s;
            .sort {
              overflow-y:scroll;
              max-height: 25vh;
            }
            &__close {
              left: initial;
              right: 20rem;
              top: 20rem;
            }
          `}
        }
      }
    }
    &__title {
      font-weight: 700;
      &-wrap {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15rem;
        ${({ theme }) => theme.sm`
          display: block;
        `}
      }
    }
    &__close {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: -12rem;
      top: -14rem;
      width: 38rem;
      height: 38rem;
      padding: 12rem;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.btnDark};
      cursor: pointer;
      svg {
        width: 15rem;
        height: 15rem;
        path {
          fill: #fff;
        }
      }
    }
  }
  .total {
    margin-top: 16rem;
    padding: 0 8rem 0 16rem;
    font-weight: 600;
    &__num {
      color: ${({ theme }) => theme.pointColor};
    }
  }
`

const ListsMore = styled.div`
  text-align: center;
  margin-top: -50rem;
  svg,
  .more__title {
    padding: 2rem 0;
    vertical-align: bottom;
  }
  .more {
    &__btn {
      padding: 20rem 48rem;
      font-size: 16rem;
      color: ${({ theme }) => theme.textColor};
      border-radius: 10px;
      cursor: pointer;
      svg {
        display: inline-block;
        width: 23rem;
        margin-right: 5rem;
        transition: transform 0.4s;
        path {
          fill: ${({ theme }) => theme.textColor};
        }
      }
      &:hover {
        svg {
          transform: rotate(180deg);
        }
        .more__title {
          &:before {
            width: 100%;
            transform: translateX(100%);
            transition: width 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s;
          }
        }
      }
    }
    &__title {
      display: inline-block;
      position: relative;
      overflow: hidden;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2rem;
        background-color: ${({ theme }) => theme.textColor};
      }
    }
  }
`

const ListsWrapper = styled.div`
  margin-bottom: 70rem;
  ${({ theme }) => theme.sm`
    margin-bottom: 40rem;
  `}
  .lists {
    &-wrap {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
    }
    &__item {
      flex: 0 0 33.3333%;
      max-width: 33.3333%;
      padding: 0 10px;
      ${({ theme }) => theme.xl`
        flex: 0 0 50%;
        max-width: 50%;
      `}
      ${({ theme }) => theme.md`
        flex: 0 0 100%;
        max-width: 100%;
      `}
    }
  }
`
