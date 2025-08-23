'use client';

import { motion } from 'framer-motion';
import Pretitle from '../elements/Pretitle';

interface BlockHeaderProps {
    pretitle?: string;
    title?: string;

}

const BlockHeader = ({ pretitle, title }: BlockHeaderProps) => {
    return (
        <section className="relative py-8 md:py-16 bg-primary/10">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {pretitle && <Pretitle text={pretitle} center />}
                    {title && (
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default BlockHeader;

