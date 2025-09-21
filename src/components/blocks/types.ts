/**
 * Định nghĩa các kiểu cho từng component trong Dynamic Zone
 */

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
  | { __component: string; id: number; [key: string]: unknown }; // Kiểu dự phòng

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
