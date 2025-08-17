import { getAllArticles } from '@/lib/api';
import { getTranslations } from 'next-intl/server';
import Pagination from '@/components/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/blog/ArticleCard';
import Pretitle from '@/components/Pretitle';

interface BlogPageProps {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog' });
    return {
        title: t('title'),
        description: t('subtitle'),
    };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
    const { locale } = await params;
    const sp = searchParams ? await searchParams : {};
    const t = await getTranslations({ locale, namespace: 'blog' });
    const tNav = await getTranslations({ locale, namespace: 'navigation' });
    const currentPage = Number(sp?.page) || 1;
    const articlesPerPage = 10;

    const articlesResponse = await getAllArticles(locale, {
        page: currentPage,
        pageSize: articlesPerPage,
    });

    const articles = articlesResponse.data;
    const pageCount = articlesResponse.meta.pagination.pageCount;

    const hasArticles = articles && articles.length > 0;

    const breadcrumbItems = [
        { label: tNav('home'), href: '/' },
        { label: t('title') }
    ];

    return (
        <section className="py-4 xl:py-8">
            <div className="container mx-auto px-6">
                <Breadcrumbs items={breadcrumbItems} />
                {/* Title */}
                <div className="text-center mb-12">
                    <Pretitle text={t('title')} center={true} />
                    <h2 className="mb-4">{t('subtitle')}</h2>
                </div>

                {hasArticles ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} locale={locale} readMoreText={t('read_more')} />
                            ))}
                        </div>
                        <Pagination pageCount={pageCount} />
                    </>
                ) : (
                    <div className="text-center py-16"><p className="text-muted-foreground">{t('noArticlesFound')}</p></div>
                )}
            </div>
        </section>
    );
}