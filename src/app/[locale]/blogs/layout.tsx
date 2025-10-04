import ListPageLayout from '@/components/layouts/ListPageLayout';
import { AsyncProps } from '@/types/global';
import { getTranslations } from 'next-intl/server';

// Ép buộc render động cho toàn bộ layout và các trang con.
// Điều này đảm bảo mọi request sẽ fetch dữ liệu mới nhất từ Strapi.
export const dynamic = "force-dynamic";

export default async function BlogLayout({ params, children }: AsyncProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog' });
    const tNav = await getTranslations({ locale, namespace: 'navigation' });

    const breadcrumbItems = [
        { label: tNav('home'), href: '/' },
        { label: t('title'), href: '/blogs' } // Link to the blog list page
    ];

    return (

        <ListPageLayout
            title={t('title')}
            subtitle={t('subtitle')}
            breadcrumbItems={breadcrumbItems}
        >
            {children}
        </ListPageLayout>
    );
}