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
  type: string
  url: string
}

export interface ZigzagItem {
  title: string
  content: string
}

export interface ProjectDetails {
  name: string
  title: TitleType
  kind: Kind
  zigzag: Record<string, ZigzagItem>
}

export interface Portfolio {
  [key: string]: ProjectDetails
}

export interface PointItemProps {
  item: ProjectDetails
  index: number
}
