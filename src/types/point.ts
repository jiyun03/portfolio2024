export interface TitleType {
  subtitle: string
  title: string
  tag: string
  color: string
  content: string
  feel: string
}

export interface Kind {
  date: string
  techStack: string
  work: string
  url: string
}

export interface ZigzagItem {
  title: string
  content: string
}

export interface Btn {
  prev: string
  next: string
}

export interface ProjectDetails {
  name: string
  title: TitleType
  kind: Kind
  zigzag: Record<string, ZigzagItem>
  btn?: Btn
}

export interface Portfolio {
  [key: string]: ProjectDetails
}

export interface PointItemProps {
  item: ProjectDetails
  index: number
}
