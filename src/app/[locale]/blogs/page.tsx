import ArticleCard from '@/components/blocks/ArticleCard';
import BlogSearch from '@/components/blocks/BlogSearch';
import Pagination from '@/components/blocks/Pagination';
import { getAllArticles, getAllCategories } from '@/lib/api';
import { getTranslations } from 'next-intl/server';
import { Article } from '@/types/strapi/collections/article';
import BlogCategoryFilter from '@/components/blocks/BlogCategoryFilter';

interface BlogPageProps {
    params: { locale: string };
    searchParams?: { page?: string; query?: string; category?: string };
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
    const query = searchParams?.query || '';
    const categorySlug = searchParams?.category || '';
    const t = await getTranslations({ locale, namespace: 'blog' });
    const currentPage = Number(searchParams?.page) || 1;
    const articlesPerPage = 10;

    // Lấy danh mục và bài viết song song để tối ưu hiệu suất
    const [articlesResponse, categories] = await Promise.all([
        getAllArticles(locale, {
            page: currentPage,
            pageSize: articlesPerPage,
            query: query,
            categorySlug: categorySlug,
        }),
        getAllCategories(locale),
    ]);

    const articles = articlesResponse.data;
    const pageCount = articlesResponse.meta.pagination.pageCount;

    const hasArticles = articles && articles.length > 0;

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <BlogSearch />
                <BlogCategoryFilter categories={categories} />
            </div>
            {hasArticles ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {articles.map((article: Article) => (
                            <ArticleCard key={article.id} article={article} locale={locale} />
                        ))}
                    </div>
                    <Pagination pageCount={pageCount} />
                </>
            ) : (
                <div className="text-center py-16"><p className="text-muted-foreground">{t('noArticlesFound')}</p></div>
            )}
        </div>
    );
}