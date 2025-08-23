import { getRecruitmentArticles } from '@/lib/api';
import { getTranslations } from 'next-intl/server';
import Pretitle from '@/components/Pretitle';
import RecruitmentCard from '@/components/blog/RecruitmentCard';

interface RecruitmentPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RecruitmentPageProps) {
    const { locale } = await params;
}

export default async function recruitmentPage({ params }: RecruitmentPageProps) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'recruitment' });

    const articlesResponse = await getRecruitmentArticles(locale);

    const articles = articlesResponse.data;

    const hasArticles = articles && articles.length > 0;

    return (
        <section className="py-4 xl:py-8">
            <div className="container mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-12">
                    <Pretitle text={t('title')} center={true} />
                    <h2 className="mb-4">{t('subtitle')}</h2>
                </div>

                {hasArticles ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {articles.map((article) => (
                                <RecruitmentCard key={article.id} article={article} locale={locale} readMoreText={t('read_more')} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16"><p className="text-muted-foreground">{t('noArticlesFound')}</p></div>
                )}
            </div>
        </section>
    );
}