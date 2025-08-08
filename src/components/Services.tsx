'use client';

import { useTranslations } from "next-intl";
import Pretitle from "./Pretitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SmartButton from "./SmartButton";
import { motion } from "framer-motion";
import { useServiceContext } from "@/context/ServiceContext";

const Services = () => {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const { activeService, setActiveService } = useServiceContext();

  const items = t.raw('items') as { id: string; title: string; description: string; image: string, url: string }[];

  const defaultTabId = items.length > 0 ? items[0].id : '';
  const tabValue = activeService && items.some(i => i.id === activeService) ? activeService : defaultTabId;

  if (!items || items.length === 0) {
    return (
      <section id="services" className="py-16 xl:py-32 bg-primary/10">
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
        <Tabs
          value={tabValue}
          onValueChange={setActiveService}
          className="w-full flex flex-col lg:flex-row items-start gap-12"
        >
          {/* Danh sách các thẻ dịch vụ */}
          <div className="w-full lg:w-1/3">
            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-4 rounded-none overflow-hidden">
              {items.map((item) => (
                <TabsTrigger key={item.id} value={item.id} className="flex w-full p-4 sm:p-6 border border-primary/20 bg-primary/5 data-[state=active]:bg-secondary/70 data-[state=active]:border-primary/20 data-[state=active]:shadow-lg transition-all duration-300 rounded-lg whitespace-normal">
                  <div className="w-full h-full flex items-center justify-center lg:justify-start">
                    <p className="text-sm sm:text-base font-semibold text-primary uppercase text-center lg:text-left">{item.title}</p>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {/* Phần hiển thị chi tiết dịch vụ */}
          <div className="w-full lg:w-2/3">
            {items.map((item) => (
              <TabsContent value={item.id} key={item.id} className="w-full m-0">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center h-full bg-white p-8 rounded-lg shadow-lg border border-primary/10 group">
                  {/* Image */}
                  <div 
                    className="relative w-full h-[300px] xl:h-full min-h-[300px] border-4 overflow-hidden [filter:drop-shadow(0_0_10px_hsl(var(--secondary)))]"
                  >
                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1279px) 90vw, 45vw"
                    />
                  </div>
                  {/* Text */}
                  <div className="text-center xl:text-left">
                    <h3 className="text-2xl xl:text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-base text-muted-foreground mb-6 whitespace-pre-line">
                      {item.description}
                    </p>
                    <div className="w-full flex xl:items-center justify-center xl:justify-start gap-4">
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

export default Services;