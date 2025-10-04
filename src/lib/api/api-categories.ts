import {
  Category,
  mapCategory,
  StrapiCategory,
} from "@/types/strapi/collections/category";
import { StrapiResponseCollection } from "@/types/strapi/strapi";
import { strapiClient } from "../custom-strapi-client";

type CategoriesResponse = StrapiResponseCollection<StrapiCategory>;

/**
 * Lấy tất cả các danh mục bài viết.
 */
export async function getAllCategories(locale: string): Promise<Category[]> {
  const client = strapiClient(locale, {
    next: { revalidate: 30 },
  });
  try {
    const response = (await client.collection("categories").find({
      locale,
      sort: "name:asc",
      pagination: {
        pageSize: 100, // Giả sử có ít hơn 100 danh mục
      },
    })) as unknown as CategoriesResponse;

    return response.data?.map(mapCategory) || [];
  } catch (error) {
    console.error("API Error: Could not fetch categories.", error);
    return [];
  }
}
