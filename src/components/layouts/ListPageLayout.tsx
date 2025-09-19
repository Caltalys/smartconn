// src/components/layouts/ListPageLayout.tsx
import Breadcrumbs, { BreadcrumbItem } from '@/components/blocks/Breadcrumbs';
import Pretitle from '@/components/elements/Pretitle';
import React from 'react';

interface ListPageLayoutProps {
    title: string;
    subtitle: string;
    breadcrumbItems: BreadcrumbItem[];
    children: React.ReactNode;
}

export default function ListPageLayout({
    title,
    subtitle,
    breadcrumbItems,
    children,
}: ListPageLayoutProps) {
    return (
        <section className="py-4 xl:py-8">
            <div className="container mx-auto px-6">
                <Breadcrumbs items={breadcrumbItems} />
                {/* Title */}
                {/* <div className="text-center mb-12">
                    <Pretitle text={title} center={true} />
                    <h2 className="mb-4">{subtitle}</h2>
                </div> */}
                {/* Page-specific content will be rendered here */}
                {children}
            </div>
        </section>
    );
}
