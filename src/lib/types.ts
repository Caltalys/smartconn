export interface Articles {
  data: Article[]
  meta: Meta
}

export interface Block {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface Article {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  locale: string
  cover: Cover | null
  category: Category | null
  author: Author | null
  blocks: Block[] | null
}

export interface Cover {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Formats {
  thumbnail: Thumbnail
  medium: Medium
  small: Small
  large?: Large
}

export interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface Medium {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface Small {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface Large {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface Author {
  id: number
  documentId: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
