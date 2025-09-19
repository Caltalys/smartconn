import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/utils';
import { formatDate } from '@/lib/format-date';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import Breadcrumbs from '@/components/blocks/Breadcrumbs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

  const imageUrl = getStrapiMedia(article.cover?.url);

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description ?? undefined,
      images: imageUrl ? [imageUrl] : [],
      type: 'article',
      publishedTime: article.publishedAt ?? undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  
  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMedia(article.cover?.url);

  const breadcrumbItems = [
    { label: tNav('home'), href: `/${locale}` },
    { label: t('title'), href: `/${locale}/blogs` },
    { label: article.title }
  ];

  return (
    <main className="py-8 xl:py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <article>
          <header className="mb-8">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:text-4xl">
              {article.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
              {article.author && (
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.avatarUrl || undefined} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{article.author.name}</span>
                </div>
              )}
              <time dateTime={article.publishedAt ?? ""}>{formatDate(article.publishedAt, locale)}</time>
            </div>
          </header>

          {imageUrl && (
            <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={article.cover?.alternativeText || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose md:prose-lg lg:prose-xl dark:prose-invert max-w-none">
            {/* <p className="lead text-xl text-muted-foreground">{article.description}</p> */}
            {article.blocks && <BlockRenderer blocks={article.blocks} />}
          </div>

          <div className="mt-12 text-center">
            <Link href={`/${locale}/blogs`}>
              <Button variant="outline">
                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                {t('back_to_blog')}
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}