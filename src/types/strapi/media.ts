/**
 * Định nghĩa kiểu cho một ảnh từ Strapi
 */
export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    url: string;
    width: number;
    height: number;
  };
}
