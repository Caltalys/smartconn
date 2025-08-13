'use client';

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Pretitle from "./Pretitle";
import { RiArrowRightUpLine } from "react-icons/ri";
import { AboutSection } from "@/lib/types";

const About = ({ data }: { data?: AboutSection }) => {
  const t = useTranslations('about_us');
  
  const title = data?.title || t('title');
  const subtitle = data?.subtitle || t('subtitle');
  const description = data?.description || t('description');
  const cta = data?.cta;
  const imageUrl = data?.image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_FILE_URL}${data.image.url}`
    : "/shark-ana.jpg";
  const imageAlt = data?.image?.alternativeText || subtitle;

  return (
    <motion.section
      id="about"
      className="py-16 xl:py-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="flex items-center justify-center order-1 xl:order-none">
            <div className="relative w-full max-w-md xl:w-full xl:max-w-none aspect-[4/3]">
              <div className="flex w-full h-full bg-secondary absolute -top-3 -left-3 -z-10 rounded-md"></div>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1279px) 448px, 40vw"
                className="object-cover rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col items-center xl:items-start text-center xl:text-left order-2 xl:order-none">
            <Pretitle text={title} />
            <h2 className="mb-6">{subtitle}</h2>
            <p className="mb-8 text-muted-foreground max-w-2xl">{description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
              <Link href={cta?.href || "/about"} className="relative flex items-center justify-center group bg-secondary cursor-pointer w-[180px] h-12 min-w-[180px] lg:w-[210px] lg:h-14 lg:min-w-[200px]">
                <span className="font-primary font-bold text-primary uppercase text-sm lg:text-md tracking-[1.2px] text-center pl-2 pr-12 lg:pl-4 lg:pr-14">
                  {cta?.label || t('learn_more')}
                </span>
                <div className="absolute top-1/2 -translate-y-1/2 right-1 lg:right-1.5 flex items-center justify-center bg-secondary-foreground w-10 h-10 lg:w-11 lg:h-11">
                  <RiArrowRightUpLine className="text-white text-lg group-hover:rotate-45 transition-all duration-300 lg:text-xl" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About;