import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/utils';
import { formatDate } from '@/lib/format-date';
import BlockRenderer from '@/components/blog/BlockRenderer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiArrowLeftLine } from 'react-icons/ri';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata(
  { params }: ArticlePageProps
): Promise<Metadata> {
  const { slug, locale } = await params; 
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'recruitment' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  
  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMedia(article.cover?.url);

  const breadcrumbItems = [
    { label: tNav('home'), href: '/' },
    { label: t('title'), href: '/recruitment' },
    { label: article.title }
  ];

  return (
    <main className="py-4 xl:py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <article>
          <header className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
            <h2 className="mb-4 leading-tight text-gray-900 dark:text-white">
              {article.title}
            </h2>
            <div className="text-gray-500 dark:text-gray-400">
              <span>{formatDate(article.publishedAt, locale)}</span>
              {article.author && <span> &bull; By {article.author.name}</span>}
            </div>
          </header>

          {imageUrl && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={article.cover?.alternativeText || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* <p className="lead text-xl font-medium">{article.description}</p> */}
            {article.blocks && <BlockRenderer blocks={article.blocks} />}
          </div>

          <div className="mt-12 text-center">
            <Link href="/recruitment">
              <Button variant="outline">
                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                {t('back_to_recruitment')}
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}