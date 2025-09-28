'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { PartnersSectionData } from '@/types/strapi/sections/partners';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Pretitle from '../elements/Pretitle';

const Partners = ({ data }: { data: PartnersSectionData }) => {
    if (!data || !data.items || data.items.length === 0) {
        return null;
    }
    const { pretitle, title, items } = data;

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
                    <Pretitle text={pretitle} center={true} />
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide">{title}</h2>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {items.map((partner) => (
                            <CarouselItem key={partner.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                <div className="p-1">
                                    <Link href={partner.href} target="_blank" rel="noopener noreferrer" className="relative h-32 w-full flex items-center justify-center group">
                                        <Image
                                            src={partner.logoUrl}
                                            alt={partner.alt || partner.name || 'Partner Logo'}
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