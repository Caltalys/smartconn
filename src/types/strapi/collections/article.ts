import { getStrapiMedia } from "@/lib/utils";
import {
  AnyContentBlock,
  AnyStrapiContentBlock,
  mapContentBlocks,
} from "../blocks/content-blocks";
import {
  BaseMedia,
  StrapiEntity,
  StrapiResponse,
  StrapiResponseCollection,
} from "../strapi";
import { Author, mapAuthor, StrapiAuthor } from "./author";
import { Category, mapCategory, StrapiCategory } from "./category";

export interface StrapiArticle extends StrapiEntity {
  title: string;
  description: string | null;
  slug: string;
  cover: BaseMedia | null;
  author: StrapiAuthor;
  category: StrapiCategory;
  blocks: AnyStrapiContentBlock[];
}

// Mapped for frontend
export interface Article extends StrapiEntity {
  title: string;
  description: string | null;
  slug: string;
  coverUrl: string | null;
  coverAlt: string;
  author: Author;
  category: Category;
  blocks: AnyContentBlock[];
  publishedAt: string | null;
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type ArticleResponse = StrapiResponse<StrapiArticle>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu.
 */
export type ArticleCollectionResponse = StrapiResponseCollection<StrapiArticle>;

export function mapArticle(article: StrapiArticle): Article {
  return {
    ...article,
    coverUrl: article.cover ? getStrapiMedia(article.cover.url) : null,
    coverAlt: article.cover?.alternativeText ?? article.title,
    author: mapAuthor(article.author),
    category: mapCategory(article.category),
    blocks: mapContentBlocks(article.blocks),
  };
}
