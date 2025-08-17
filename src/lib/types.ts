
export interface BaseProps {
  params: { locale: string };
}

export interface AsyncBaseProps {
  params: Promise<{ locale: string }>;
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

export interface StrapiComponent {
  id: number;
  __component?: string;
}

export interface Media extends StrapiEntity {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown
}

export interface LinkItem {
  id: number;
  label: string;
  href: string;
  heading: string;
  target?: string;
  submenus?: LinkItem[];
}

export interface Navbar {
  id: number;
  menus: LinkItem[];
}

export interface HeaderSection extends StrapiComponent {
  navbar: Navbar;
}

export interface LandingPage extends StrapiEntity {
  headerSection?: HeaderSection;
  heroSection?: HeroSection;
  aboutSection?: AboutSection;
  servicesSection?: ServicesSection;
  advantagesSection?: AdvantagesSection;
  partnerSection?: PartnerSection;
}

export interface BaseSection {
  id: number;
  title: string | null;
  subtitle: string | null;
  heading: string | null;
  subHeading: string | null;
  description: string | null;
  ctas: Cta[];
  image?: Media | null;
}

export interface HeroSection extends StrapiComponent {
  image: Media | null;
  base: BaseSection;
}

export interface AboutSection extends StrapiComponent {
  base: BaseSection;
}

export interface ServicesSection extends StrapiComponent {
  services: FeatureItem[];
  base: BaseSection;
}

export interface AdvantagesSection extends StrapiComponent {
  items: FeatureItem[];
  base: BaseSection;
}

export interface PartnerSection extends StrapiComponent {
  items: FeatureItem[];
  base: BaseSection;
}

export interface AboutPage extends StrapiComponent {
  headline?: Headline;
  blocks: Block[];
  features: FeatureItem[];
}

export interface FeatureItem {
  id: number;
  label: string | null;
  href: string | null;
  target: string | null;
  heading: string | null;
  description: string | null;
  image?: Media | null;
  itemId?: string;
}

export interface Cta {
  id: number
  label: string
  href: string
  target: string | null
  isInternal?: boolean
  heading?: string | null
  description?: string | null
}

export interface Articles {
  data: Article[]
  meta: Meta
}

export interface Services {
  data: Service[]
  meta: Meta
}

export interface Block {
  __component: string;
  id: number;
  [key: string]: unknown;
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

export interface Service extends StrapiEntity {
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

export interface Headline extends StrapiComponent {
  headline?: string
  subheadline?: string
}