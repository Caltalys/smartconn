'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Pretitle from './Pretitle';
import { motion } from 'framer-motion';

const AboutPageContent = () => {
  const t = useTranslations('about_us_page');

  return (
    <main>
      {/* Page Hero */}
      <section className="relative py-24 md:py-32 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Pretitle text={t('hero.pretitle')} center />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t('hero.title')}</h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Shark Ana */}
      <section className="py-16 xl:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-md xl:w-full xl:max-w-none aspect-[4/3]">
                <div className="flex w-full h-full bg-secondary absolute -top-3 -left-3 -z-10 rounded-md"></div>
                <Image
                  src={"/shark-ana.jpg"}
                  alt={t('shark_ana.title')}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1279px) 448px, 40vw"
                  className="object-cover rounded-md"
                />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6">{t('shark_ana.title')}</h2>
              <p className="mb-4 text-muted-foreground">{t('shark_ana.p1')}</p>
              <p className="text-muted-foreground">{t('shark_ana.p2')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-16 xl:py-32 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-primary">{t('vision.title')}</h3>
              <p className="text-muted-foreground max-w-md mx-auto md:mx-0">{t('vision.text')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-primary">{t('mission.title')}</h3>
              <p className="text-muted-foreground max-w-md mx-auto md:mx-0">{t('mission.text')}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPageContent;