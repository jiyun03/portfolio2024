export interface ListProps {
  title: string
  name: string
  status: string
  link: string
  subtitle: string
  date: string
  works: string
  company: string
  type: string
}

export interface SortItem {
  id: string
  name: string
  item?: Array<string>
}

export interface SortContent {
  name: string
  item: SortItem[]
}

export interface ItemProps {
  item: ListProps
}

export interface Portfolio {
  [key: string]: ListProps
}
