'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Pretitle from './elements/Pretitle';
import { motion } from 'framer-motion';

// Define the type for a FAQ item for better type safety
type FaqItem = {
  question: string;
  answer: string;
};

const Faq = () => {
  const t = useTranslations('faq');
  const items: FaqItem[] = t.raw('items');

  return (
    <motion.section
      id="faq"
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

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline text-lg text-primary font-bold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.section>
  );
}

export default Faq
