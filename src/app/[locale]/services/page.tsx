import Pagination from '@/components/blocks/Pagination';
import ServiceCard from '@/components/blocks/ServiceCard';
import { getAllServices } from '@/lib/api/api-services';
import { Service } from '@/types/strapi/collections/service';
import { getTranslations } from 'next-intl/server';

interface ServicePageProps {
    params: Promise<{ locale: string, page?: string; query?: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'services' });
    return {
        title: t('title'),
        description: t('subtitle'),
    };
}

export default async function ServicesPage({ params }: ServicePageProps) {
    const { locale, page, query } = await params;
    const t = await getTranslations({ locale, namespace: 'services' });
    const currentPage = Number(page) || 1;
    const servicesPerPage = 10;

    // Lấy danh mục và bài viết song song để tối ưu hiệu suất
    const [servicesResponse] = await Promise.all([
        getAllServices(locale, {
            page: currentPage,
            pageSize: servicesPerPage,
            query: query || ''
        }),
    ]);

    const services = servicesResponse?.data;
    const pageCount = servicesResponse?.meta?.pagination?.pageCount;

    const hasServices = services && services.length > 0;

    return (
        <div className="space-y-8">
            {hasServices ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {services.map((service: Service) => (
                            <ServiceCard key={service.id} service={service} locale={locale} />
                        ))}
                    </div>
                    {pageCount && pageCount > 1 && (<Pagination pageCount={pageCount} />)}
                </>
            ) : (
                <div className="text-center py-16"><p className="text-muted-foreground">{t('noServicesFound')}</p></div>
            )}
        </div>
    );
}