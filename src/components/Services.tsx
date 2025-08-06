'use client';

import { useTranslations } from "next-intl";
import Pretitle from "./Pretitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SmartButton from "./SmartButton";
import { motion } from "framer-motion";

const Services = () => {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');

  const items = t.raw('items') as { id: string; title: string; description: string; image: string, url: string }[];

  if (!items || items.length === 0) {
    return (
      <section id="services" className="py-16 xl:py-32 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <p>No services available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="services"
      className="py-16 xl:py-32 bg-primary/5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Pretitle text={t('title')} center={true} />
          <h2 className="mb-4">{t('subtitle')}</h2>
        </div>
        <Tabs defaultValue={items[0].id} className="w-full flex flex-col lg:flex-row items-start gap-12">
          {/* Danh sách các thẻ dịch vụ */}
          <div className="w-full lg:w-1/3">
            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-4 rounded-none overflow-hidden">
              {items.map((item) => (
                <TabsTrigger key={item.id} value={item.id}
                  className="flex w-full p-4 sm:p-6 data-[state=active]:bg-secondary/80 transition-all duration-300 rounded-none whitespace-normal shadow-lg">
                  <div className="w-full h-full flex items-center justify-center lg:justify-start">
                    <p className="text-sm sm:text-base font-bold text-primary uppercase text-center lg:text-left">{item.title}</p>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {/* Phần hiển thị chi tiết dịch vụ */}
          <div className="w-full lg:w-2/3">
            {items.map((item) => (
              <TabsContent value={item.id} key={item.id} className="w-full m-0">
                <div className="relative w-full h-[460px] rounded-lg overflow-hidden shadow-lg group">
                  <Image
                    src={item.image}
                    fill
                    alt={item.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1279px) 90vw, 66vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 md:p-12">
                    <div className="max-w-md text-white">
                      <h3 className="text-2xl xl:text-4xl font-bold mb-4 drop-shadow-lg">{item.title}</h3>
                      <p className="text-base xl:text-lg mb-8 drop-shadow-md">{item.description}</p>
                      <SmartButton text={tCommon('more')} href={item.url} />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </motion.section>
  )
}

export default Services