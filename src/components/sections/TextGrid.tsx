'use client';

import { motion } from 'framer-motion';

export interface TextGridProps {
    data: {
        items: { title: string; text: string }[];
    };
}

const TextGrid = ({ data }: TextGridProps) => {
    if (!data?.items?.length) return null;

    return (
        <section className="py-8 xl:py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
                    {data.items.map((item, index) => (
                        <motion.div className='bg-primary/10 p-4 rounded-lg shadow-lg'
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-3xl font-bold mb-4 text-primary">{item.title}</h3>
                            <p className="text-muted-foreground max-w-md mx-auto md:mx-0">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TextGrid;

