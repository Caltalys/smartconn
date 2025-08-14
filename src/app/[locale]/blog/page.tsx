import { getAllArticles } from '@/lib/api';
import { Article } from '@/lib/types';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getStrapiMedia } from '@/lib/utils';
import Pagination from '@/components/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs';
import Pretitle from '@/components/Pretitle';

type BlogPost = {
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
    slug: string;
};

interface BlogPageProps {
    params: { locale: string };
    searchParams?: {
        page?: string;
    };
}

export async function generateMetadata({ params: { locale } }: BlogPageProps) {
    const t = await getTranslations({ locale, namespace: 'blog' });
    return {
        title: t('title'),
        description: t('subtitle'),
    };
}

export default async function BlogPage({ params: { locale }, searchParams }: BlogPageProps) {
    const t = await getTranslations({ locale, namespace: 'blog' });
    const tNav = await getTranslations({ locale, namespace: 'navigation' });
    const currentPage = Number(searchParams?.page) || 1;
    const articlesPerPage = 3;

    const articlesResponse = await getAllArticles(locale, {
        page: currentPage,
        pageSize: articlesPerPage,
    });

    const articles = articlesResponse.data;
    const pageCount = articlesResponse.meta.pagination.pageCount;

    const hasArticles = articles && articles.length > 0;

    const items: BlogPost[] = hasArticles
        ? articles.map(article => ({
            slug: article.slug,
            title: article.title,
            description: article.description,
            image: (article.cover?.url && getStrapiMedia(article.cover.url)) || '/blog/post-placeholder.jpg',
            category: article.category?.name || 'Uncategorized',
            date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }) : 'No date',
        }))
        : [];

    const breadcrumbItems = [
        { label: tNav('home'), href: '/' },
        { label: t('title') }
    ];

    return (
        <section className="py-12 xl:py-16">
            <div className="container mx-auto px-6">
                <Breadcrumbs items={breadcrumbItems} />
                {/* Title */}
                <div className="text-center mb-12">
                    <Pretitle text={t('title')} center={true} />
                    <h2 className="mb-4">{t('subtitle')}</h2>
                </div>

                {hasArticles ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((post, index) => (
                                <Card key={index} className="overflow-hidden shadow-lg flex flex-col group bg-primary/5 border-primary/10">
                                    <CardHeader className="p-0">
                                        <div className="relative w-full h-60">
                                            <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow">
                                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground"><span className="text-accent font-semibold">{post.category}</span><span>&bull;</span><span>{post.date}</span></div>
                                        <CardTitle className="text-xl mb-2 line-clamp-2">{post.title}</CardTitle>
                                        <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0"><Link href={`/blog/${post.slug}`} className="w-full"><Button variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground">{t('read_more')}</Button></Link></CardFooter>
                                </Card>
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