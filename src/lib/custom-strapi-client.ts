import { strapi, type Config, type StrapiClient } from "@strapi/client";

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

/**
 * Factory function để tạo một Strapi client tùy chỉnh.
 * Mở rộng kiểu Config gốc để TypeScript nhận diện thuộc tính `fetch`.
 * Đây là một tùy chọn không được ghi trong tài liệu của Strapi client nhưng rất hữu ích.
 */
interface CustomStrapiConfig extends Config {
  fetch?: typeof fetch;
}

/**
 *
 * Điểm khác biệt chính: Client này cho phép chúng ta truyền vào một hàm `fetch` đã được
 * tùy chỉnh. Điều này rất quan trọng trong Next.js để có thể kiểm soát việc caching.
 *
 * @param locale - Ngôn ngữ tùy chọn để thêm vào header.
 * @returns Một instance của StrapiClient.
 */
export const strapiClient = (locale?: string): StrapiClient => {
  // Tạo một hàm fetch tùy chỉnh để thêm các tùy chọn vô hiệu hóa cache.
  // `cache: 'no-store'` là cách mạnh mẽ nhất để đảm bảo dữ liệu luôn mới.
  const customFetch: typeof fetch = (input, init) => {
    return fetch(input, {
      ...init,
      cache: "no-store",
    });
  };

  const config: CustomStrapiConfig = {
    baseURL: strapiUrl,
    fetch: customFetch, // Sử dụng hàm fetch tùy chỉnh của chúng ta
    ...(strapiToken && { auth: strapiToken }),
    ...(locale && {
      headers: {
        "Accept-Language": locale,
      },
    }),
  };

  // Ép kiểu đối tượng config để TypeScript chấp nhận thuộc tính `fetch`
  return strapi(config as Config);
};
