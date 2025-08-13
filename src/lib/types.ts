
export interface BaseProps {
  params: {
    locale: string;
  };
}

export interface Formats {
  thumbnail: File
  medium: File
  small: File
  large?: File
}

export interface File {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  locale: string
}

export interface StrapiComponent extends StrapiEntity {
  __component: string;
}

export interface Media extends StrapiEntity {
  name: string
  alternativeText: any
  caption: any
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
}

export interface LandingPage extends StrapiComponent {
  heroSection?: HeroSection;
  aboutSection?: AboutSection;
  servicesSection?: ServicesSection;

}

export interface HeroSection extends StrapiComponent {
  heading: string;
  subtitle: string;
  description?: string;
  button: Button;
  cta: Cta | null;
  image: Media | null;
}

export interface AboutSection extends StrapiComponent {
  title: string;
  heading: string;
  subtitle: string;
  description?: string;
  cta: Cta | null;
  image: Media | null;
}

export interface ServicesSection extends StrapiComponent {
  title: string;
  heading: string;
  subtitle: string;
  description?: string;
  cta: Cta | null;
  image: Media | null;
  items: ServiceItem[] | null;
}

export interface ServiceItem extends StrapiComponent {
  title: string;
  subtitle: string;
  description?: string;
  cta: Cta | null;
  image: Media | null;
  itemId?: string;
}

export interface Cta {
  id: number
  label: string
  href: string
  isInternal: boolean
}

export interface Button extends StrapiComponent {
  text: string;
  href: string;
  target: string;
}

export interface Articles {
  data: Article[]
  meta: Meta
}

export interface Block {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface Article extends StrapiEntity {
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  locale: string
  cover: Media | null
  category: Category | null
  author: Author | null
  blocks: Block[] | null
}

export interface Category extends StrapiEntity {
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface Author extends StrapiEntity {
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
