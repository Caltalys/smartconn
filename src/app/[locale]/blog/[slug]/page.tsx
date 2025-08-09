import { getArticleBySlug, getAllArticles } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";
import BlockRenderer from "@/components/blog/BlockRenderer";
import { Article } from "@/lib/types";
import { Metadata } from "next";

interface ArticlePageProps {
  params: {
    slug: string;
    locale: string;
  };
}

function flattenArticle(data: any): Article | null {
  if (!data) return null;
  return {
    id: data.id,
    ...data,
    cover: data.cover?.data ? { id: data.cover.data.id, ...data.cover.data } : null,
    category: data.category?.data ? { id: data.category.data.id, ...data.category.data } : null,
    author: data.author?.data ? { id: data.author.data.id, ...data.author.data } : null,
    blocks: data.blocks || null,
  };
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const articlesResponse = await getAllArticles(locale);
  return articlesResponse.data.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = params;
  const articleResponse = await getArticleBySlug(slug, locale);
  if (!articleResponse) return { title: "Article Not Found" };

  const article = flattenArticle(articleResponse);
  if (!article) return { title: "Article Not Found" };

  const imageUrl = getStrapiMedia(article.cover?.url);

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/${locale}/blog/${slug}`,
      images: imageUrl ? [{ url: imageUrl, width: article.cover?.width, height: article.cover?.height }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const articleResponse = await getArticleBySlug(slug, locale);
  if (!articleResponse) notFound();

  const article = flattenArticle(articleResponse);
  if (!article) notFound();

  const imageUrl = getStrapiMedia(article.cover?.url);
  const categoryUrl = article.category ? `/${locale}/blog/category/${article.category.slug}` : `/${locale}/blog`;

  return (
    <main className="container mx-auto px-6 py-12 md:py-20">
      <article className="prose lg:prose-xl max-w-4xl mx-auto dark:prose-invert">
        <div className="mb-8 border-b pb-8 dark:border-gray-700">
          {article.category && (
            <Link href={categoryUrl} className="text-primary font-semibold uppercase tracking-wide no-underline hover:underline">
              {article.category.name}
            </Link>
          )}
          <h1 className="mt-2 mb-4 text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            {article.title}
          </h1>
          <p className="text-lg text-muted-foreground mt-0">
            {article.description}
          </p>
          <div className="mt-6 flex items-center text-sm text-muted-foreground">
            <time dateTime={article.publishedAt ?? ""}>
              {formatDate(article.publishedAt, locale)}
            </time>
          </div>
        </div>

        {imageUrl && (
          <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={article.cover?.alternativeText || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {article.blocks && <BlockRenderer blocks={article.blocks} />}

        <div className="mt-12 pt-8 border-t dark:border-gray-700">
          <Link href={`/${locale}/blog`} className="text-primary hover:underline no-underline font-semibold">
            &larr; {t("back_to_blog")}
          </Link>
        </div>
      </article>
    </main>
  );
}