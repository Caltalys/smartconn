import {
  Article,
  ArticleCollectionResponse,
  mapArticle,
  StrapiArticle,
} from "@/types/strapi/collections/article";
import { StrapiResponseCollection } from "@/types/strapi/strapi";
import { strapiClient } from "../custom-strapi-client";

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
): Promise<ArticleCollectionResponse | null> {
  const client = strapiClient(locale, {
    next: { revalidate: 30 },
  });
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
    })) as unknown as StrapiResponseCollection<StrapiArticle>;

    // Ánh xạ thủ công cho danh sách, không cần map `blocks` để tối ưu hiệu suất.
    const articles: Article[] = response.data.map((article) =>
      mapArticle(article)
    );
    return {
      data: articles,
      meta: response.meta,
    };
  } catch (error) {
    console.error("API Error: Could not fetch articles.", error);
    return null;
  }
}

/**
 * Lấy một bài viết duy nhất dựa vào slug.
 */
export async function getArticleBySlug(
  slug: string,
  locale: string
): Promise<Article | null> {
  const client = strapiClient(locale, {
    next: { revalidate: 30 },
  });
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
    console.log(response);
    if (!response.data) return null;

    // mapArticle là hàm đồng bộ, không cần await
    return mapArticle(response.data[0]);
  } catch (error) {
    console.error(
      `API Error: Could not fetch article with slug "${slug}".`,
      error
    );
    return null;
  }
}
