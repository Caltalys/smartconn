import PageRenderer from '@/components/blocks/PageRenderer';
import { fetchPageBySlug } from '@/lib/api/api-page';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';
import { getAllArticles } from '@/lib/api';
import { BlogSectionData } from '@/types/strapi/sections/blog';

// Bọc hàm fetch bằng React.cache để khử trùng lặp các yêu cầu trong một render.
// Điều này đảm bảo `fetchPageBySlug` chỉ được gọi một lần ngay cả khi
// `generateMetadata` và `HomePage` đều gọi nó.
const getPageData = cache(async (slug: string, locale: string) => {
    return fetchPageBySlug(slug, locale);
});

interface HomePageProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: HomePageProps, parent: ResolvingMetadata): Promise<Metadata> {
    const { locale } = params;
    const homeSlug = locale === 'vi' ? 'trang-chu' : 'home';
    const pageData = await getPageData(homeSlug, locale);
    if (!pageData) return {};

    return {
        title: pageData.metaTitle || pageData.title,
        description: pageData.metaDescription,
    };
}

/**
 * Component cho trang chủ.
 *
 * Đây là một Server Component, nó sẽ thực hiện các công việc sau ở phía server:
 * 1. Lấy `locale` từ `params`.
 * 2. Gọi hàm `getPageData` (đã được cache) với slug là "home" để lấy dữ liệu nội dung của trang chủ từ Strapi.
 * 3. Nếu không tìm thấy dữ liệu, nó sẽ hiển thị trang 404.
 * 4. Nếu có dữ liệu, nó sẽ truyền mảng `contentSections` vào component `PageRenderer` để hiển thị nội dung động.
 *
 * @param params - Chứa thông tin về route, bao gồm `locale`.
 */
export default async function HomePage({ params }: HomePageProps) {
    const { locale } = params;
    const homeSlug = locale === 'vi' ? 'trang-chu' : 'home';

    // Tối ưu: Gọi song song cả dữ liệu trang và danh sách bài viết
    const [pageData, articlesResponse] = await Promise.all([
        getPageData(homeSlug, locale),
        getAllArticles(locale, { pageSize: 3 }), // Lấy 3 bài viết mới nhất
    ]);

    if (!pageData) {
        notFound();
    }

    // Khởi tạo contentSections với các section từ pageData
    const contentSections = [...pageData.contentSections];

    // Chỉ thêm section bài viết mới nếu có ít nhất một bài viết
    if (articlesResponse.data && articlesResponse.data.length > 0) {
        contentSections.push({
            __component: 'sections.blog',
            id: Date.now(),
            pretitle: 'Tin tức & Sự kiện',
            title: 'Bài viết mới nhất',
            articles: articlesResponse.data,
            viewAllButtonLabel: 'Xem tất cả',
        });
    }

    return <PageRenderer sections={contentSections} />;
}