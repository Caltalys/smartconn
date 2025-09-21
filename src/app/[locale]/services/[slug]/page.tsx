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
import { getServiceBySlug } from '@/lib/api/api-services';

interface ServiceDetailPageProps {
    params: Promise<{ locale: string, slug: string }>;
}

export async function generateMetadata(
    { params }: ServiceDetailPageProps
): Promise<Metadata> {
    const { slug, locale } = await params;
    const service = await getServiceBySlug(slug, locale);

    if (!service) {
        return {};
    }

    const imageUrl = getStrapiMedia(service.cover?.url);

    return {
        title: service.title,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description ?? undefined,
            images: imageUrl ? [imageUrl] : [],
            type: 'article',
            publishedTime: service.publishedAt ?? undefined,
        },
    };
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
    const { slug, locale } = await params;
    const service = await getServiceBySlug(slug, locale);
    const t = await getTranslations({ locale, namespace: 'services' });
    const tNav = await getTranslations({ locale, namespace: 'navigation' });

    if (!service) {
        notFound();
    }

    const imageUrl = getStrapiMedia(service.cover?.url);

    const breadcrumbItems = [
        { label: tNav('home'), href: `/${locale}` },
        { label: t('title'), href: `/${locale}/services` },
        { label: service.title }
    ];

    return (
        <main className="py-8 xl:py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <article>
                    <header className="mb-8">
                        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:text-4xl">
                            {service.title}
                        </h1>
                        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                            <time dateTime={service.publishedAt ?? ""}>{formatDate(service.publishedAt, locale)}</time>
                        </div>
                    </header>

                    {imageUrl && (
                        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={imageUrl}
                                alt={service.cover?.alternativeText || service.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose md:prose-lg lg:prose-xl dark:prose-invert max-w-none">
                        {service.blocks && <BlockRenderer blocks={service.blocks} />}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href={`/${locale}/services`}>
                            <Button variant="outline">
                                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                                {t('backToServices')}
                            </Button>
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}