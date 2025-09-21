import ListPageLayout from '@/components/layouts/ListPageLayout';
import { AsyncProps } from '@/types/global';
import { getTranslations } from 'next-intl/server';


export default async function ServiceLayout({ params, children }: AsyncProps) {
    const { locale } = await params;
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