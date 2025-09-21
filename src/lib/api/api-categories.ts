import { Category, StrapiCategory } from "@/types/strapi/collections/category";
import { StrapiResponseCollection } from "@/types/strapi/strapi";
import { strapiClient } from "../strapi-client";

/**
 * Ánh xạ dữ liệu thô của một Category.
 */
function mapCategory(category: StrapiCategory): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
  };
}

type CategoriesResponse = StrapiResponseCollection<StrapiCategory>;

/**
 * Lấy tất cả các danh mục bài viết.
 */
export async function getAllCategories(locale: string): Promise<Category[]> {
  const client = strapiClient(locale);
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
