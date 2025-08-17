'use client';

import { motion } from "framer-motion";
import Pretitle from "../Pretitle";
import { Headline } from "@/lib/types";

export interface YoutubeVideoProps {
    headline?: Headline;
    title?: string;
    text?: string;
    youtubeId?: string;
}

const YoutubeVideo = ({ headline, title, text, youtubeId }: YoutubeVideoProps) => {

    if (!youtubeId) {
        return null;
    }

    return (
        <motion.section
            className="py-8 xl:py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}>
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    {headline?.headline && <Pretitle text={headline.headline} center />}
                    {title && <h2 className="mb-4">{title}</h2>}
                    {text && <p className="text-muted-foreground">{text}</p>}
                </div>

                <div className="relative aspect-video w-full max-w-4xl mx-auto">
                    { youtubeId && <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                        src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                    }
                </div>
            </div>
        </motion.section>
    );
}

export default YoutubeVideo;