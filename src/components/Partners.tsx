'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Pretitle from './elements/Pretitle';
import Link from 'next/link';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { PartnerSection } from '@/lib/types';
import { getStrapiMedia } from '@/lib/utils';

const staticPartners = [
    { name: 'Adsolutions', alt: 'Adsolutions', logo: '/partners/adsolution.png', href: 'https://adsolutions.vn' },
    { name: 'Gemate', alt: 'Gemate', logo: '/partners/gemate.png', href: 'https://gemate.vn' },
    { name: 'WeAngels', alt: 'WeAngels', logo: '/partners/weangels.jpeg', href: 'https://weangels.vn' },
    { name: 'M&A', alt: 'M&A', logo: '/partners/ma-vietnam.png', href: 'https://mavietnam.vn' },
    { name: 'ThinhTien', alt: 'ThinhTien', logo: '/partners/thinhtien.jpg', href: '#' },
    { name: 'TeamKCN', alt: 'TeamKCN', logo: '/partners/teamkcn.jpg', href: 'https://teamkcn.vn' },
    { name: 'GFT', alt: 'GFT' , logo: '/partners/gft.jpg', href: '#' },
];

const Partners = ({ data }: { data?: PartnerSection }) => {
    const t = useTranslations('why_choose_us');
    
    const title = data?.base?.title || t('partners_title');
    const hasDynamicPartners = data?.items && data.items.length > 0;

    const partners = hasDynamicPartners
        ? data.items.map(p => {
            const name = p.heading || p.label || 'Partner';
            const staticPartner = staticPartners.find(sp => sp.name.toLowerCase() === name.toLowerCase());
            
            const logoUrl = (p.image?.url && getStrapiMedia(p.image.url)) 
                || staticPartner?.logo 
                || `/partners/${name.toLowerCase().replace(/\s/g, '-')}.png`;

            return {
                name: name,
                logo: logoUrl,
                href: p.href || '#',
                alt: p.image?.alternativeText || name,
            };
        }) 
        : staticPartners;
    
    return (
        <motion.section
            id="partners"
            className="py-12 xl:py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <Pretitle text={title} center={true} />
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {partners.map((partner) => (
                            <CarouselItem key={partner.name} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                <div className="p-1">
                                    <Link href={partner.href} target="_blank" rel="noopener noreferrer" className="relative h-32 w-full flex items-center justify-center group">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.alt || partner.name}
                                            fill
                                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                                            sizes="128px"
                                        />
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
                        <CarouselPrevious className="static translate-y-0 text-primary" />
                        <CarouselNext className="static translate-y-0 text-primary" />
                    </div>
                    <CarouselPrevious className="hidden lg:flex text-primary" />
                    <CarouselNext className="hidden lg:flex text-primary" />
                </Carousel>
            </div>
        </motion.section>
    );
};

export default Partners;