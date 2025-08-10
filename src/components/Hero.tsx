"use client";

import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import SmartButton from "./SmartButton";
import Image from "next/image";
import { HeroSection } from "@/lib/types";

// Variants for staggered animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Hero = ({ data }: { data?: HeroSection }) => {
  const t = useTranslations('hero');
  
  return (
    <section
      id="home"
      className="relative py-20 xl:py-32 min-h-screen flex items-center overflow-hidden"
    >
      {/* Blurred Background & Overlay */}
      <div className="absolute inset-0 bg-[url('/bg-4.jpg')] bg-cover bg-center bg-no-repeat blur-sm scale-105"></div>
      <div className="absolute inset-0 bg-primary/50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content on the left */}
          <motion.div
            className="flex flex-col text-white items-center text-center lg:items-start lg:text-left space-y-10 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {t('title')}
            </motion.h1>
            <motion.h1
              className="text-secondary text-4xl sm:text-6xl lg:text-7xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.h1>
            <motion.p
              className="text-white max-w-lg lg:text-lg"
              variants={itemVariants}
            >
              {t('description')}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <SmartButton text={t('services')} href="#services" />
            </motion.div>
          </motion.div>

          {/* Image on the right */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md xl:max-w-lg aspect-square">
              {/* Decorative blob/circle */}
              <div className="w-full h-full bg-secondary absolute -top-4 -right-4 -z-10 rounded-md"></div>
              {/* Image container */}
              <div className="relative w-full h-full rounded-md overflow-hidden shadow-2xl">
                <Image
                  src={"/hero.jpg"}
                  alt={t('subtitle')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 80vw, 45vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;