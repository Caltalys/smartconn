'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Pretitle from './Pretitle';
import { RiStarLine, RiTeamLine, RiToolsLine, RiGroup2Line } from 'react-icons/ri';
import Link from 'next/link';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface IconProps {
    className?: string;
    size?: number | string;
    color?: string;
}

const icons: Record<string, React.ComponentType<IconProps>> = {
    star: RiStarLine,
    tools: RiToolsLine,
    community: RiGroup2Line,
    partners: RiTeamLine,
};

const partners = [
    { name: 'Adsolutions', logo: '/partners/adsolution.png', href: 'https://adsolutions.vn' },
    { name: 'GEMate', logo: '/partners/gemate.jpg', href: 'https://gemate.vn' },
    { name: 'WeAngels', logo: '/partners/weangels.jpeg', href: 'https://weangels.vn' },
    { name: 'M&A Vietnam', logo: '/partners/ma-vietnam.png', href: 'https://mavietnam.vn' },
    { name: 'Thinh Tien', logo: '/partners/thinhtien.jpg', href: '#' },
    { name: 'TeamKCN', logo: '/partners/teamkcn.jpg', href: 'https://teamkcn.vn' },
    { name: 'GFT', logo: '/partners/gft.jpg', href: '#' },
];

const WhyChooseUs = () => {
    const t = useTranslations('why_choose_us');
    const items = t.raw('items') as { icon: string; title: string; description: string }[];

    return (
        <motion.section
            id="why-us"
            className="py-16 xl:py-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <Pretitle text={t('title')} center={true} />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {items.map((item, index) => {
                        const Icon = icons[item.icon];
                        return (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg text-center flex flex-col items-center border border-primary/10 shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mb-4">
                                    {Icon && <Icon className="w-8 h-8" />}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Partners Section */}
                <div className="text-center">
                    <Pretitle text={t('partners_title')} center={true} />
                    {/* <h3 className="text-2xl font-bold mb-8">{t('partners_title')}</h3> */}
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
                                                alt={partner.name}
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
            </div>
        </motion.section>
    );
};

export default WhyChooseUs;