import Pretitle from '@/components/elements/Pretitle';
import ListPageLayout from '@/components/layouts/ListPageLayout';
import { getTranslations } from 'next-intl/server';

interface BlogLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}

export default async function BlogLayout({ children, params: { locale } }: BlogLayoutProps) {
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