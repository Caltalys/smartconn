import { Article } from "../collections/article";
import { StrapiComponent } from "../strapi";

/**
 * Cấu trúc dữ liệu thô của Blog Section từ Strapi.
 * Section này hoạt động như một placeholder, chỉ định nơi hiển thị và cách hiển thị các bài viết.
 * API ID: sections.blog
 */
export interface StrapiBlogSection extends StrapiComponent {
    __component: 'sections.blog';
    title?: string | null; // Sẽ được map thành pretitle
    heading: string;      // Sẽ được map thành title
    numberOfPosts?: number | null; // Số lượng bài viết muốn hiển thị
    viewAllButtonLabel?: string | null; // Nhãn cho nút "Xem tất cả"
}

/**
 * Cấu trúc dữ liệu của Blog Section đã được ánh xạ cho frontend.
 * Nó chứa một danh sách các bài viết đã được fetch riêng trong quá trình mapping.
 */
export type BlogSectionData = {
    id: number;
    __component: 'sections.blog';
    pretitle: string;
    title: string;
    articles: Article[]; // Dữ liệu bài viết được fetch và đính kèm
    viewAllButtonLabel: string;
};