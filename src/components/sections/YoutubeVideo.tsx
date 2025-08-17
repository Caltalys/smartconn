'use client';

import { motion } from "framer-motion";
import Pretitle from "../Pretitle";
import { Headline } from "@/lib/types";

export interface YoutubeVideoProps {
    headline?: Headline;
    title?: string;
    text?: string;
    textPosition?: 'Left' | 'Right';
    youtubeId?: string;
}

const YoutubeVideo = ({ headline, title, text, textPosition = 'Left', youtubeId }: YoutubeVideoProps) => {

    if (!youtubeId) {
        return null;
    }

    const videoIframe = (
        <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    );

    return (
        <motion.section
            className="py-8 xl:py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-6">
                {text ? (
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                        <div className={`text-center lg:text-left ${textPosition === 'Right' ? 'lg:order-last' : ''}`}>
                            {headline?.headline && <Pretitle text={headline.headline} />}
                            {title && <h2 className="mb-4">{title}</h2>}
                            <p className="text-muted-foreground">{text}</p>
                        </div>
                        <div className="relative aspect-video w-full">
                            {videoIframe}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-center max-w-3xl mx-auto mb-8">
                            {headline?.headline && <Pretitle text={headline.headline} center />}
                            {title && <h2 className="mb-4">{title}</h2>}
                        </div>
                        <div className="relative aspect-video w-full max-w-4xl mx-auto">
                            {videoIframe}
                        </div>
                    </>
                )}
            </div>
        </motion.section>
    );
}

export default YoutubeVideo;