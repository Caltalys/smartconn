import Pretitle from '@/components/elements/Pretitle';
import ListPageLayout from '@/components/layouts/ListPageLayout';
import { getTranslations } from 'next-intl/server';

interface ServiceLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export default async function ServiceLayout({ children, params: { locale } }: ServiceLayoutProps) {
    const t = await getTranslations({ locale, namespace: 'services' });
    const tNav = await getTranslations({ locale, namespace: 'navigation' });

    const breadcrumbItems = [
        { label: tNav('home'), href: '/' },
        { label: t('title'), href: '/services' } // Link to the blog list page
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