'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Pretitle from './Pretitle';
import { motion } from 'framer-motion';

// Define the type for a testimonial item
type TestimonialItem = {
    quote: string;
    name: string;
    title: string;
    image: string;
};

const Testimonials = () => {
    const t = useTranslations('testimonials');
    const items: TestimonialItem[] = t.raw('items');

    return (
        <motion.section
            id="testimonials"
            className="py-16 xl:py-32 bg-primary/5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}>
            <div className="container mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-12">
                    <Pretitle text={t('title')} center={true} />
                    <h2 className="mb-4">{t('subtitle')}</h2>
                </div>

                {/* Carousel */}
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {items.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full flex flex-col justify-between p-6 shadow-lg">
                                    <CardContent className="p-0 mb-6">
                                        <p className="text-muted-foreground italic">"{item.quote}"</p>
                                    </CardContent>
                                    <CardHeader className="p-0 flex flex-row items-center gap-4">
                                        <Image src={item.image} alt={item.name} width={56} height={56} className="rounded-full border-2 border-accent" />
                                        <div className="flex flex-col">
                                            <CardTitle className="text-lg">{item.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{item.title}</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />
                </Carousel>
            </div>
        </motion.section>
    );
}

export default Testimonials;