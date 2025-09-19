'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Category } from '@/types/strapi/collections/category';
import { Button } from '@/components/ui/button';


interface BlogCategoryFilterProps {
    categories: Category[];
}

export default function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const t = useTranslations('blog');

    const currentCategory = searchParams.get('category') || '';

    const handleFilter = (categorySlug: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1'); // Reset về trang 1 khi đổi bộ lọc
        if (categorySlug) {
            params.set('category', categorySlug);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant={!currentCategory ? 'default' : 'outline'} className="rounded-full" onClick={() => handleFilter('')}>
                {t('allCategories')}
            </Button>
            {categories.map((category) => (
                <Button key={category.id} variant={currentCategory === category.slug ? 'default' : 'outline'} className="rounded-full" onClick={() => handleFilter(category.slug)}>
                    {category.name}
                </Button>
            ))}
        </div>
    );
}