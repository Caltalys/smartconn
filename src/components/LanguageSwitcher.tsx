"use client";

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Button } from './ui/button';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
    const t = useTranslations('common');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleLocaleChange = (nextLocale: 'vi' | 'en') => {
        if (nextLocale === locale || isPending) return;

        // When the locale is changed, we need to tell Next.js to refetch all
        // server-side data for the new locale, including data in the layout.
        // `router.replace` alone only does a soft navigation.
        // `router.refresh()` forces a refetch from the server for the current route.
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale, scroll: false });
            router.refresh();
        });
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
                disabled={isPending}
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
                disabled={isPending}
                aria-current={locale === 'en' ? 'page' : undefined}
            >
                EN
            </Button>
        </div>
    );
}