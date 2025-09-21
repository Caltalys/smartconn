import { AnySharedBlock } from "@/types/strapi/blocks/shared";
import { Article, StrapiArticle } from "@/types/strapi/collections/article";
import { Author, StrapiAuthor } from "@/types/strapi/collections/author";
import { Category, StrapiCategory } from "@/types/strapi/collections/category";
import { Meta, StrapiResponseCollection } from "@/types/strapi/strapi";
import { strapiClient } from "../strapi-client";
import { getStrapiMedia } from "../utils";
import { mapContentSections } from "./api-page";

// --- Mappers ---

/**
 * Ánh xạ dữ liệu thô của một Author.
 */
function mapAuthor(author: StrapiAuthor | null): Author | null {
  if (!author) return null;
  return {
    id: author.id,
    name: author.name,
    avatarUrl: getStrapiMedia(author.avatar?.url),
  };
}

/**
 * Ánh xạ dữ liệu thô của một Category.
 */
function mapCategory(category: StrapiCategory | null): Category | null {
  if (!category) return null;
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
  };
}

/**
 * Ánh xạ dữ liệu thô của một Article từ Strapi sang cấu trúc dữ liệu sạch cho frontend.
 * Hàm này là async để xử lý việc ánh xạ các block trong dynamic zone.
 */
export async function mapArticle(
  article: StrapiArticle,
  locale: string
): Promise<Article> {
  const mappedBlocks = article.blocks
    ? await mapContentSections(article.blocks, locale)
    : [];

  return {
    id: article.id,
    title: article.title,
    description: article.description,
    slug: article.slug,
    cover: article.cover,
    author: mapAuthor(article.author),
    category: mapCategory(article.category),
    // Ép kiểu an toàn vì chúng ta giả định dynamic zone của Article chỉ chứa các shared block.
    blocks: mappedBlocks as AnySharedBlock[],
    publishedAt: article.publishedAt,
  };
}

// --- API Fetchers ---

type ArticlesResponse = StrapiResponseCollection<StrapiArticle>;

/**
 * Lấy tất cả bài viết, hỗ trợ phân trang và tìm kiếm.
 */
export async function getAllArticles(
  locale: string,
  params: {
    page?: number;
    pageSize?: number;
    query?: string;
    categorySlug?: string;
  } = {}
): Promise<{ data: Article[]; meta: Meta }> {
  const client = strapiClient(locale);
  const { page = 1, pageSize = 10, query = "", categorySlug = "" } = params;

  try {
    const response = (await client.collection("articles").find({
      locale,
      sort: "publishedAt:desc",
      pagination: {
        page,
        pageSize,
      },
      filters: {
        ...(query && { title: { $containsi: query } }),
        ...(categorySlug && { category: { slug: { $eq: categorySlug } } }),
      },
      populate: ["cover", "category", "author", "author.avatar"],
    })) as unknown as ArticlesResponse;

    // Ánh xạ thủ công cho danh sách, không cần map `blocks` để tối ưu hiệu suất.
    const articles: Article[] = response.data.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      slug: article.slug,
      cover: article.cover,
      author: mapAuthor(article.author),
      category: mapCategory(article.category),
      blocks: [], // Trả về mảng rỗng cho trang danh sách để khớp với kiểu `Article`
      publishedAt: article.publishedAt,
    }));
    return {
      data: articles,
      meta: response.meta,
    };
  } catch (error) {
    console.error("API Error: Could not fetch articles.", error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize, pageCount: 1, total: 0 } },
    };
  }
}

/**
 * Lấy một bài viết duy nhất dựa vào slug.
 */
export async function getArticleBySlug(
  slug: string,
  locale: string
): Promise<Article | null> {
  const client = strapiClient(locale);
  try {
    const response = (await client.collection("articles").find({
      locale,
      filters: { slug: { $eq: slug } },
      // Cập nhật populate để lấy đủ dữ liệu cho các block lồng nhau
      populate: {
        cover: true,
        category: true,
        author: { populate: ["avatar"] },
        blocks: {
          on: {
            "shared.image": { populate: { image: true } },
            "shared.media": { populate: { file: true } },
            "shared.slider": {
              populate: { slides: { populate: { image: true } } },
            },
            "shared.list-item": {
              populate: {
                items: {
                  populate: {
                    image: true,
                    cta: true,
                    icon: { populate: { iconImage: true } },
                  },
                },
              },
            },
            "shared.richtext-video": { populate: { video: true } },
            "shared.richtext-image": { populate: { image: true } },
            "shared.quote": true,
            "shared.rich-text": true,
            "shared.video": true,
          },
        },
      },
    })) as unknown as StrapiResponseCollection<StrapiArticle>;

    if (!response.data || response.data.length === 0) return null;

    return await mapArticle(response.data[0], locale);
  } catch (error) {
    console.error(
      `API Error: Could not fetch article with slug "${slug}".`,
      error
    );
    return null;
  }
}
