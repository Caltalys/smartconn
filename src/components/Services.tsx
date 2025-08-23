// src/components/Services.tsx
'use client';

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Pretitle from "./elements/Pretitle";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { RiArrowRightUpLine } from "react-icons/ri";
import { FeatureItem, ServicesSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/utils";

interface UnifiedServiceItem {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaHref: string;
  ctaLabel: string;
}

interface StaticServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

const Services = ({ data }: { data?: ServicesSection }) => {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');

  const title = data?.base?.title || t('title');
  const subtitle = data?.base?.heading || t('subtitle');
  
  const hasServiceItemData = data?.services && data.services.length > 0;

  // Chuyển đổi dữ liệu động hoặc tĩnh về một cấu trúc chung
  const items: UnifiedServiceItem[] = hasServiceItemData
      ? data!.services!.map((item: FeatureItem) => ({
        id: item.id,
        title: item.heading || '',
        description: item.description || '',
        imageUrl: item.image?.url
          ? `${getStrapiMedia(item.image.url)}`
          : "/service-placeholder.jpg", // Ảnh dự phòng
        imageAlt: item.image?.alternativeText || item.heading || "Service Image",
        ctaHref: item.href || '#',
        ctaLabel: item.label || tCommon('more'),
      }))
    : (t.raw('items') as StaticServiceItem[]).map((item, index) => ({
        id: item.id || index,
        title: item.title,
        description: item.description,
        imageUrl: item.image,
        imageAlt: item.title,
        ctaHref: item.url,
        ctaLabel: tCommon('more'),
      }));

  return (
    <motion.section
      id="services"
      className="py-12 xl:py-16 bg-primary/10"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Pretitle text={title} center/>
          <h2 className="mb-4">{subtitle}</h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full aspect-[3/2] xl:aspect-square mb-6">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-justify text-muted-foreground mb-6 flex-grow">{item.description}</p>
              <Link href={item.ctaHref} className="relative flex items-center justify-center group bg-secondary cursor-pointer w-[180px] h-12 min-w-[180px]">
                <span className="font-primary font-bold text-primary uppercase text-sm tracking-[1.2px] text-center pl-2 pr-12">
                  {item.ctaLabel}
                </span>
                <div className="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center bg-secondary-foreground w-10 h-10">
                  <RiArrowRightUpLine className="text-white text-lg group-hover:rotate-45 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
