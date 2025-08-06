'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import Pretitle from "./Pretitle";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div
    variants={fadeInUp}
    className="text-center mb-12"
  >
    <Pretitle text={title} center/>
    {/* <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl uppercase">
      {title}
    </h2> */}
    {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
  </motion.div>
);

const Gallery = () => {
  const t = useTranslations('gallery');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // In a real application, this data would likely come from a CMS or the translation files.
  const galleryImages = [
    { src: '/gallery/1.jpg', alt: '1.jpg' },
    { src: '/gallery/2.jpg', alt: '2.jpg' },
    { src: '/gallery/3.jpg', alt: '3.jpg' },
    { src: '/gallery/4.jpg', alt: '4.jpg' },
    { src: '/gallery/5.jpg', alt: '5.jpg' }
  ];

  return (
    <motion.section
      id="thu-vien"
      className="py-16 xl:py-32"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} />
        <motion.div variants={fadeInUp}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((image, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 group">
                  <button
                    type="button"
                    className="p-1 w-full h-full cursor-pointer"
                    onClick={() => {
                      setIndex(idx);
                      setOpen(true);
                    }}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="relative flex aspect-video items-center justify-center p-0">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={idx < 3}
                        />
                      </CardContent>
                    </Card>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </motion.div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={galleryImages}
        index={index}
      />
      {/* <motion.div variants={fadeInUp} className="pt-8 text-center font-semibold bottom-wave bg-primary">
        <p className="pb-8 text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {t('subtitle')}
        </p>
      </motion.div> */}
    </motion.section>
  );
};

export default Gallery;