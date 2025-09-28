'use client';

import { AboutSectionData } from "@/types/strapi/sections/about";
import { motion } from "framer-motion";
import Image from "next/image";
import Pretitle from "../elements/Pretitle";
import SmartButton from "../elements/SmartButton";

const About = ({ data }: { data: AboutSectionData }) => {
  if (!data) {
    return null;
  }

  const { pretitle, title, description, ctas, imageUrl, imageAlt } = data;
  const id = `${data.__component}-${data.id}`;
  return (
    <motion.section
      id={id}
      className="py-12 xl:py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="flex items-center justify-center order-1 xl:order-none">
            <div className="relative w-full max-w-md xl:w-full xl:max-w-none aspect-[4/3]">
              <div className="flex w-full h-full bg-secondary absolute -top-3 -left-3 -z-10 rounded-lg"></div>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1279px) 448px, 40vw"
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col items-center xl:items-start text-center xl:text-left order-2 xl:order-none">
            <Pretitle text={pretitle} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-6">{title}</h2>
            <p className="mb-8 text-muted-foreground max-w-2xl">{description}</p>
            {
              ctas && ctas.length > 0 && ctas.map((cta, index) => (
                <SmartButton key={index} text={cta.label} href={cta.href} />
              ))
            }
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About;