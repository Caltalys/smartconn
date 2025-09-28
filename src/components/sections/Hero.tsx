"use client";

import { getStrapiMedia } from "@/lib/utils";
import { HeroSection } from "@/types/strapi/sections/hero";
import { motion, Variants } from "framer-motion";
import Image from 'next/image';
import { useState } from "react";
import { RiPlayFill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import SmartButton from "../elements/SmartButton";
// Ví dụ: Nếu bạn dùng Swiper.js
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

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

const Hero = ({ data }: { data: HeroSection }) => {
  const [playVideo, setPlayVideo] = useState(false);

  if (!data) {
    return null;
  }

  const heading = data.title;
  const subtitle = data.subtitle;
  const description = data.description;
  const imageUrl = data.mediaImage?.image?.url ? getStrapiMedia(data.mediaImage.image.url) : null;
  const imageAlt = data.mediaImage?.alternativeText || subtitle || heading || "Hero Image";
  const youtubeId = data.mediaVideo?.youtubeId;
  const videoThumbnailUrl = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : '';
  const id = `${data.__component}-${data.id}`;

  return (
    <section
      id={id}
      className="relative py-16 xl:py-32 flex items-center overflow-hidden"
    >
      {/* Tối ưu hóa 1: Sử dụng next/image cho ảnh nền */}
      <Image
        src="/bg-4.jpg"
        alt=""
        fill
        priority
        className="object-cover blur-sm scale-105 -z-20"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/50 -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content on the left */}
          <motion.div
            className="flex flex-col text-white items-center text-center lg:items-start lg:text-left space-y-10 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {heading && <motion.h1 variants={itemVariants}
              className="font-bold uppercase tracking-wide text-white text-3xl sm:text-4xl lg:text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {heading}
            </motion.h1>}
            {subtitle && <motion.h1
              className="font-bold uppercase tracking-wide text-secondary text-3xl sm:text-4xl lg:text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              variants={itemVariants}
            >
              {subtitle}
            </motion.h1>}
            {description && <motion.div
              // Thêm class `prose` để định dạng nội dung rich text
              className="text-white max-w-lg lg:text-lg prose prose-invert"
              variants={itemVariants}
            >
              {/* Sử dụng ReactMarkdown để render nội dung rich text một cách an toàn */}
              <ReactMarkdown>{description}</ReactMarkdown>
            </motion.div>}
            {data.ctas && data.ctas.length > 0 && (
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                variants={itemVariants}
              >
                {data.ctas.map((cta) => <SmartButton key={cta.id} text={cta.label} href={cta.href} />)}
              </motion.div>
            )}
          </motion.div>

          {/* Media on the right */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Tối ưu hóa 2: Mẫu Facade cho Video YouTube */}
            {data.mediaType === 'video' && youtubeId ? (
              <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg">
                {playVideo ? (
                  // Chỉ render iframe khi người dùng nhấp chuột
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1&mute=0`}
                    title={heading || "Hero Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  // Ban đầu chỉ render ảnh thumbnail và nút play
                  <button
                    onClick={() => setPlayVideo(true)}
                    className="w-full h-full flex items-center justify-center group"
                    aria-label={`Play video: ${heading || 'Hero Video'}`}
                  >
                    <Image
                      src={videoThumbnailUrl}
                      alt={heading || "Video thumbnail"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1279px) 90vw, 672px"
                      priority // Tải ưu tiên ảnh thumbnail
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute w-20 h-20 bg-primary/80 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                      <RiPlayFill size={48} />
                    </div>
                  </button>
                )}
              </div>
            ) : data.mediaType === 'image' && imageUrl && (
              <div className="relative w-full max-w-sm sm:max-w-md xl:max-w-lg aspect-square">
                {/* Decorative blob/circle */}
                <div className="w-full h-full bg-secondary absolute -top-4 -right-4 -z-10 rounded-lg"></div>
                {/* Image container */}
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 448px, 512px"
                    priority
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;