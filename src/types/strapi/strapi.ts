export interface StrapiResponse<T> {
  // For single types, the transformer flattens the data.
  data: T | null;
  meta?: Record<string, unknown>;
}

export interface StrapiResponseCollection<T> {
  // The transformer flattens the 'attributes' so the data is an array of the entity itself.
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Represents the default, non-transformed structure from Strapi API.
 * This project uses a transformer, so this type is generally not used directly in responses,
 * but it's kept for reference or for cases where the transformer is bypassed.
 */
export interface StrapiData<T> {
  id: string | number;
  attributes: T;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface StrapiComponent {
  id: number;
  __component?: string;
}
export interface Block extends StrapiComponent {
  [key: string]: unknown;
}

export interface StrapiPage {
  id: number;
  title: string;
  slug: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaImage?: Media | null;
  contentSections: Block[]; // Block là type chung cho các component trong Dynamic Zone
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

export interface Formats {
  thumbnail: File;
  medium: File;
  small: File;
  large?: File;
}

export interface File {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Media extends StrapiEntity {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
}

export interface FooterSection extends StrapiComponent {
  title: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  addredd: string | null;
  phone: string | null;
  email: string | null;
  copyright: string | null;
}
