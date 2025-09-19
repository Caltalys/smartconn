// src/components/Services.tsx
'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Pretitle from "../elements/Pretitle";
import { ServicesSectionData } from "@/types/strapi/sections/services";
import SmartButton from "../elements/SmartButton";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const Services = ({ data }: { data: ServicesSectionData }) => {
  if (!data) {
    return null;
  }

  const { pretitle, title, services } = data;

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
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <Pretitle text={pretitle} center/>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide">{title}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-justify text-muted-foreground mb-6 flex-grow">{item.description}</p>
              <div className="mt-auto">
                <SmartButton text={item.cta.label} href={item.cta.href} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
