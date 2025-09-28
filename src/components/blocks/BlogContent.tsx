import { getAllArticles } from '@/lib/api';
import { Article } from '@/types/strapi/collections/article';
import { getTranslations } from 'next-intl/server';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';

interface BlogContentProps {
    locale: string;
    currentPage: number;
    articlesPerPage: number;
    query: string;
    categorySlug: string;
}

export default async function BlogContent({ locale, currentPage, articlesPerPage, query, categorySlug }: BlogContentProps) {
    const t = await getTranslations({ locale, namespace: 'blog' });

    const articlesResponse = await getAllArticles(locale, {
        page: currentPage,
        pageSize: articlesPerPage,
        query: query,
        categorySlug: categorySlug,
    });

    const articles = articlesResponse?.data;
    const pageCount = articlesResponse?.meta?.pagination?.pageCount;
    const hasArticles = articles && articles.length > 0;

    if (!hasArticles) {
        return <div className="text-center py-16"><p className="text-muted-foreground">{t('noArticlesFound')}</p></div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {articles.map((article: Article) => (
                    <ArticleCard key={article.id} article={article} locale={locale} />
                ))}
            </div>
            {pageCount && pageCount > 1 && <Pagination pageCount={pageCount} />}
        </>
    );
}