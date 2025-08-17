import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/types";
import { getStrapiMedia } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";

interface ServiceCardProps {
    article: Service;
    locale: string;
    readMoreText: string;
}

export default function ServiceCard({ article, locale, readMoreText }: ServiceCardProps) {
    const imageUrl = getStrapiMedia(article.cover?.url);
    const articleUrl = `/${locale}/services/${article.slug}`;

    return (
        <article className="overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-lg bg-white dark:bg-gray-800 flex flex-col h-full">
            <Link href={articleUrl}>
                <div className="relative h-56 w-full">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={article.cover?.alternativeText || article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={article.publishedAt ?? ""}>
                        {formatDate(article.publishedAt, locale)}
                    </time>
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-primary dark:text-white text-justify line-clamp-3">
                    <Link href={articleUrl} className="hover:underline">
                        {article.title}
                    </Link>
                </h3>
                <p className="mb-4 flex-grow font-normal text-gray-700 dark:text-gray-400 text-justify line-clamp-4">
                    {article.description}
                </p>
                <Link
                    href={articleUrl}
                    className="inline-flex items-center font-medium text-primary hover:underline self-start"
                >
                    {readMoreText}
                    <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </Link>
            </div>
        </article>
    );
}
