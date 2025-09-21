import { getStrapiMedia } from "@/lib/utils";
import { AnySharedBlock, mapBlocks, StrapiSharedBlock } from "../blocks";
import {
  StrapiMedia,
  StrapiResponse,
  StrapiResponseCollection,
} from "../strapi";

export interface StrapiAuthor {
  id: number;
  name: string;
  avatar: StrapiMedia | null;
}

export interface StrapiCategory {
  id: number;
  name: string;
  slug: string;
}

export interface StrapiArticle {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  cover: StrapiMedia | null;
  author: StrapiAuthor;
  category: StrapiCategory;
  blocks: StrapiSharedBlock[];
}

// Mapped for frontend
export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  coverUrl: string | null;
  coverAlt: string;
  author: {
    name: string;
    avatarUrl: string | null;
  };
  category: {
    name: string;
    slug: string;
  };
  blocks: AnySharedBlock[];
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type ArticleResponse = StrapiResponse<Article>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu.
 */
export type ArticleCollectionResponse = StrapiResponseCollection<Article>;

export function mapArticle(article: StrapiArticle): Article {
  return {
    id: article.id,
    title: article.title,
    description: article.description ?? "",
    slug: article.slug,
    coverUrl: article.cover ? getStrapiMedia(article.cover.url) : null,
    coverAlt: article.cover?.alternativeText ?? article.title,
    author: {
      name: article.author.name,
      avatarUrl: article.author.avatar
        ? getStrapiMedia(article.author.avatar.url)
        : null,
    },
    category: {
      name: article.category.name,
      slug: article.category.slug,
    },
    blocks: mapBlocks(article.blocks),
  };
}
