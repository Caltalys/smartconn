import AboutPageContent from '@/components/AboutPageContent';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'about_us_page.hero' });
    return {
        title: t('title'),
    };
}

export default function AboutPage({ params: { locale } }: Props) {
    setRequestLocale(locale);
    return <AboutPageContent />;
}