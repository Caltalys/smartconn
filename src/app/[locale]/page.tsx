import PageRenderer from '@/components/blocks/PageRenderer';
import Blog from '@/components/sections/Blog';
import { getAllArticles } from '@/lib/api';
import { fetchPageBySlug } from '@/lib/api/api-page';
import { AsyncBaseProps } from '@/types/global';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// Ép buộc trang này phải được render động (SSR)
export const dynamic = "force-dynamic";

// Bọc hàm fetch bằng React.cache để khử trùng lặp các yêu cầu trong một render.
// Điều này đảm bảo `fetchPageBySlug` chỉ được gọi một lần ngay cả khi
// `generateMetadata` và `HomePage` đều gọi nó.
const getPageData = cache(async (slug: string, locale: string) => {
    return fetchPageBySlug(slug, locale);
});

export async function generateMetadata({ params }: AsyncBaseProps, parent: ResolvingMetadata): Promise<Metadata> {
    const { locale } = await params;
    const homeSlug = locale === 'vi' ? 'trang-chu' : 'home';
    const pageData = await getPageData(homeSlug, locale);
    if (!pageData) return {};

    return {
        title: pageData.metaTitle,
        description: pageData.metaDescription,
        openGraph: {
            title: pageData.metaTitle ?? "",
            description: pageData.metaDescription ?? "",
            images: pageData.metaImage ?? ""
        }
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
export default async function HomePage({ params }: AsyncBaseProps) {
    const { locale } = await params;
    const homeSlug = locale === 'vi' ? 'trang-chu' : 'home';
    const pageData = await getPageData(homeSlug, locale);
    const articlesPerPage = 4;
    const articlesResponse = await getAllArticles(locale, {
        page: 1,
        pageSize: articlesPerPage
    });

    const articles = articlesResponse?.data;
    const hasArticles = articles && articles.length > 0;

    if (!pageData) {
        notFound();
    }

    // PageRenderer giờ đây đủ thông minh để xử lý tất cả các loại section,
    // bao gồm cả việc fetch dữ liệu cho 'sections.blog' nếu nó được định nghĩa trong Strapi.
    return (
        <>
            <PageRenderer sections={pageData.contentSections} />
            {hasArticles && (
                <Blog data={articles} />
            )}
        </>
    );
}