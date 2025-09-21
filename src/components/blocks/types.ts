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

/**
 * Định nghĩa các kiểu cho từng component trong Dynamic Zone
 */

// shared.quote
export interface QuoteBlock {
  __component: "shared.quote";
  id: number;
  author: string;
  text: string;
}

// shared.rich-text
export interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  content: string; // Giả sử đây là markdown hoặc HTML
}

// shared.image
export interface ImageBlock {
  __component: "shared.image";
  id: number;
  image: { data: StrapiImage };
  caption: string | null;
}

// ...

/**
 * Định nghĩa kiểu cho một slide trong slider
 */
export interface SlideElement {
  id: number;
  image: { data: StrapiImage };
  title: string | null;
  caption: string | null;
}

// shared.slider
export interface SliderBlock {
  __component: "shared.slider";
  id: number;
  slides: SlideElement[];
}

// ... Bạn có thể định nghĩa thêm các kiểu cho các block khác
// như Slider, Video, Hero, Advantages, Partners, Services
// ở đây để có type-safety đầy đủ.

/**
 * Union type cho tất cả các block có thể có trong Dynamic Zone
 */
export type DynamicZoneBlock =
  | QuoteBlock
  | RichTextBlock
  | ImageBlock
  | SliderBlock
  // Thêm các kiểu block khác vào đây
  | { __component: string; id: number; [key: string]: any }; // Kiểu dự phòng

/**
 * Định nghĩa kiểu cho dữ liệu trang "About" trả về từ API
 */
export interface AboutPageData {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: DynamicZoneBlock[];
  };
}