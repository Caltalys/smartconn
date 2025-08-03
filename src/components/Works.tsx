'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Pretitle from './Pretitle';
import { Button } from './ui/button';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for a project item for better type safety
type WorkItem = {
  category: string;
  image: string;
  title: string;
  description: string;
};

const Works = () => {
  const t = useTranslations('works');

  // Get items and define filter categories from translation file
  const items: WorkItem[] = t.raw('items');
  const filterCategories = [
    { id: 'all', name: t('filter_all') },
    { id: 'consulting', name: t('filter_consulting') },
    { id: 'training', name: t('filter_training') },
    { id: 'operations', name: t('filter_operations') },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <motion.section
      id="works"
      className="py-16 xl:py-32"
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

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterCategories.map(cat => (
            <Button
              key={cat.id}
              onClick={() => handleFilter(cat.id)}
              variant={activeCategory === cat.id ? 'accent' : 'outline'}
              className="capitalize"
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-primary/5 rounded-lg overflow-hidden shadow-lg group border border-primary/10"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-accent font-semibold mb-2 inline-block">
                    {t(`filter_${item.category}`)}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Works