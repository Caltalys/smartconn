'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Pretitle from "../elements/Pretitle";
import { getStrapiMedia } from "@/lib/utils";
import { Headline, Media } from "@/lib/types";
import SmartButton from "../elements/SmartButton";

export interface ImageTextProps {
    headline?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    image?: Media;
    imagePosition?: 'Left' | 'Right';
    cta?: {
        label: string;
        href: string;
    };
}

const ImageText = ({ headline, title, subtitle, text, image, imagePosition = 'Left', cta }: ImageTextProps) => {

    const imageUrl = image?.url ? getStrapiMedia(image.url) : undefined;
    const imageAlt = image?.alternativeText || title || "";

    const imageOrder = imagePosition === 'Left' ? 'order-1' : 'order-1 xl:order-2';
    const textOrder = imagePosition === 'Left' ? 'order-2' : 'order-2 xl:order-1';

    return (
        <motion.section
            className="py-8 xl:py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
                    {imageUrl && (
                        <div className={`flex items-center justify-center ${imageOrder}`}>
                            <div className="relative w-full max-w-md xl:w-full xl:max-w-none aspect-[4/3]">
                                <div className="flex w-full h-full bg-secondary absolute -top-3 -left-3 -z-10 rounded-lg"></div>
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt}
                                    fill
                                    sizes="(max-width: 768px) 90vw, (max-width: 1279px) 448px, 40vw"
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    <div className={`flex flex-col items-center xl:items-start text-center xl:text-left ${textOrder}`}>
                        {headline && <Pretitle text={headline} center={true}/>}
                        {title && <h2 className="mb-6">{title}</h2>}
                        {subtitle && <h3 className="mb-6">{subtitle}</h3>}
                        <p className="mb-8 text-muted-foreground max-w-2xl">{text}</p>
                        {cta && cta.label && cta.href && (
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                                <SmartButton text={cta.label} href={cta.href} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default ImageText;

