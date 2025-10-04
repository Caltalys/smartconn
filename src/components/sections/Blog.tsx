'use client';

import { Article } from '@/types/strapi/collections/article';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import ArticleCard from '../blocks/ArticleCard';
import Pretitle from '../elements/Pretitle';
import { Button } from '../ui/button';

const Blog = ({ data }: { data: Article[] }) => {
    const t = useTranslations('blog');
    const locale = useLocale();
    if (!data) return null;

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
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-4">{t('subtitle')}</h2>
                </div>

                {/* Blog Grid */}
                {data && data.length > 0 ? (
                    <>
                        {/* Tái sử dụng ArticleCard và điều chỉnh layout grid để hợp lý hơn */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {data.map((article) => (
                                <ArticleCard key={article.id} article={article} locale={locale} />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/blogs">
                                <Button variant="default">{t('viewAllArticles')}</Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">{t('noArticlesFound')}</p>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default Blog;