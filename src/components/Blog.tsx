'use client';

import { useLocale, useTranslations } from 'next-intl';
import Pretitle from './Pretitle';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Article } from '@/lib/types';
import { getStrapiMedia } from '@/lib/utils';

// Define the type for a blog post item
type BlogPost = {
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
    slug: string;
};

const Blog = ({ articles }: { articles?: Article[] }) => {
    const t = useTranslations('blog');
    const locale = useLocale();

    const hasArticles = articles && articles.length > 0;

    const items: BlogPost[] = hasArticles
        ? articles.map(article => ({
            slug: article.slug,
            title: article.title,
            description: article.description,
            image: (article.cover?.url && getStrapiMedia(article.cover.url)) || '/post-placeholder.jpg',
            category: article.category?.name || 'Uncategorized',
            date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }) : 'No date',
        }))
        : (t.raw('items') as BlogPost[]);

    return (
        <motion.section
            id="blog"
            className="py-12 xl:py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}>
            <div className="container mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-12">
                    <Pretitle text={t('title')} center={true} />
                    <h2 className="mb-4">{t('subtitle')}</h2>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((post, index) => (
                        <Card key={index} className="overflow-hidden shadow-lg flex flex-col group bg-primary/5 border-primary/10">
                            <CardHeader className="p-0">
                                <div className="relative w-full h-60">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                                    <span className="text-accent font-semibold">{post.category}</span>
                                    <span>&bull;</span>
                                    <span>{post.date}</span>
                                </div>
                                <CardTitle className="text-xl mb-2 line-clamp-2">{post.title}</CardTitle>
                                <p className="text-muted-foreground text-sm line-clamp-3">
                                    {post.description}
                                </p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Link href={`/blog/${post.slug}`} className="w-full">
                                    <Button variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground">
                                        {t('read_more')}
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href="/blog">
                        <Button variant="default">{t('viewAllArticles')}</Button>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
};

export default Blog;