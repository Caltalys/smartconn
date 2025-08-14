'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Pretitle from './Pretitle';
import { RiStarLine, RiTeamLine, RiToolsLine, RiGroup2Line } from 'react-icons/ri';
import { AdvantagesSection } from '@/lib/types';

interface IconProps {
    className?: string;
}

const icons: Record<string, React.ComponentType<IconProps>> = {
    star: RiStarLine,
    tools: RiToolsLine,
    community: RiGroup2Line,
    partners: RiTeamLine,
};

const Advantages = ({ data }: { data?: AdvantagesSection }) => {
    const t = useTranslations('why_choose_us');
    
    const title = data?.base?.title || t('title');
    const staticItems = t.raw('items') as { icon: string; title: string; description: string }[];
    const items = data?.items?.map((item, index) => ({
        icon: staticItems[index]?.icon || 'star',
        title: item.heading || staticItems[index]?.title,
        description: item.description || staticItems[index]?.description,
    })) || staticItems;
    
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
                <div className="text-center mb-16">
                    <Pretitle text={title} center={true} />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => {
                        const Icon = icons[item.icon];
                        return (
                            <motion.div
                                key={index}
                                className="bg-primary/10 p-6 rounded-lg text-center flex flex-col items-center border border-primary/10 shadow-lg"
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
            </div>
        </motion.section>
    );
};

export default Advantages;