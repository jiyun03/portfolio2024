// 갤러리
export interface GalleryImage {
  src: string
  desc: string
}

// about
export interface ContentItem {
  title: string
  subtitle?: string
}

export interface AboutItem {
  title: string
  content: string | string[] | ContentItem[]
}

export interface AboutItemArray {
  [key: string]: AboutItem[]
}
