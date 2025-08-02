"use client";

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Button } from './ui/button';

export default function LanguageSwitcher() {
    const t = useTranslations('common');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (nextLocale: 'vi' | 'en') => {
        if (nextLocale === locale) return;
        router.replace(pathname, { locale: nextLocale });
    };
    
    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant={locale === 'vi' ? 'accent' : 'outline'}
                size="icon"
                className="size-6"
                onClick={() => handleLocaleChange('vi')}
                aria-label={t('switchToVietnamese')}
                aria-current={locale === 'vi' ? 'page' : undefined}
            >
                VN
            </Button>
            <Button
                type="button"
                variant={locale === 'en' ? 'accent' : 'outline'}
                size="icon"
                className="size-6"
                onClick={() => handleLocaleChange('en')}
                aria-label={t('switchToEnglish')}
                aria-current={locale === 'en' ? 'page' : undefined}
            >
                EN
            </Button>
        </div>
    );
}