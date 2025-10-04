import BlogCategoryFilter from '@/components/blocks/BlogCategoryFilter';
import BlogContent from '@/components/blocks/BlogContent';
import BlogSearch from '@/components/blocks/BlogSearch';
import { getAllCategories } from '@/lib/api';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

// Ép buộc render động cho toàn bộ layout và các trang con.
// Điều này đảm bảo mọi request sẽ fetch dữ liệu mới nhất từ Strapi.
//export const dynamic = "force-dynamic";

interface BlogPageProps {
    params: { locale: string };
    searchParams: { page?: string; query?: string, category?: string };
}

export async function generateMetadata({ params }: BlogPageProps) {
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'blog' });
    return {
        title: t('title'),
        description: t('subtitle'),
    };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
    const { locale } = params;
    const { page, query, category } = searchParams;
    const currentPage = Number(page) || 1;
    const articlesPerPage = 10;

    // Chỉ fetch các categories ở đây, vì nó không phụ thuộc vào search params.
    const categories = await getAllCategories(locale);

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <BlogSearch />
                <BlogCategoryFilter categories={categories} />
            </div>
            <Suspense key={`${query}-${category}-${page}`} fallback={<div>Loading...</div>}>
                <BlogContent
                    locale={locale}
                    currentPage={currentPage}
                    articlesPerPage={articlesPerPage}
                    query={query || ''}
                    categorySlug={category || ''}
                />
            </Suspense>
        </div>
    );
}