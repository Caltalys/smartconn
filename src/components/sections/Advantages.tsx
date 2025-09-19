'use client';

import { motion } from 'framer-motion';
import Pretitle from '../elements/Pretitle';
import { AdvantagesSectionData } from '@/types/strapi/sections/advantages';
import DynamicIcon from '../elements/DynamicIcon';

const Advantages = ({ data }: { data: AdvantagesSectionData }) => {
    if (!data) {
        return null;
    }

    const { pretitle, title, description, items } = data;

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <motion.section
            id="advantages"
            className="py-12 xl:py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <Pretitle text={pretitle} center={true} />
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-4">{title}</h2>
                    {description && <p className="text-muted-foreground max-w-3xl mx-auto">{description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="bg-card p-6 rounded-lg text-center flex flex-col items-center border border-border shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mb-4">
                                <DynamicIcon icon={item.icon} altText={item.title} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Advantages;