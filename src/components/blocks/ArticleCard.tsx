import { formatDate } from "@/lib/format-date";
import { Article } from "@/types/strapi/collections/article";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
    article: Article;
    locale: string;
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
    const articleUrl = `/${locale}/blogs/${article.slug}`;

    return (
        <Link href={articleUrl} className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {/* Image container */}
            <div className="relative m-2.5 h-56 overflow-hidden rounded-md">
                {article.coverUrl ? (
                    <Image
                        src={article.coverUrl}
                        alt={article.coverAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
            </div>

            {/* Title and description container */}
            <div className="flex-grow p-4">
                <h3 className="mb-2 text-xl font-semibold text-slate-800 line-clamp-2 dark:text-slate-100">
                    {article.title}
                </h3>
                <p className="font-light leading-normal text-slate-600 line-clamp-3 dark:text-slate-400">
                    {article.description}
                </p>
            </div>

            {/* Footer with category and date */}
            <div className="mt-auto flex items-center justify-between px-4 pb-4 pt-0 text-xs text-gray-500 dark:text-gray-400">
                <span>{article.category?.name || 'Uncategorized'}</span>
                <time dateTime={article.publishedAt ?? ""}>
                    {formatDate(article.publishedAt, locale)}
                </time>
            </div>
        </Link>
    );
}
