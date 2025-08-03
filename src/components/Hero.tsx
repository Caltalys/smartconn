"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import SmartButton from "./SmartButton";

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section
      id="home"
      // Sử dụng min-h-screen thay vì h-screen để linh hoạt hơn trên các thiết bị có chiều cao khác nhau.
      // Thêm padding dọc (py) để nội dung không bị dính vào cạnh trên/dưới.
      className="relative min-h-screen bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50"></div>

      <div className="container mx-auto flex h-full items-center">
        {/* Giảm khoảng cách dọc (space-y) và tăng padding ngang (px) trên màn hình nhỏ. */}
        <motion.div className="z-20 mx-auto flex flex-col items-center space-y-8 px-4 text-center text-white xl:mx-0 xl:items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Các thẻ h1, p giờ đây sẽ nhận các style cơ bản từ tailwind.config.js */}
          <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
            {t('title')}
          </h1>
          {/* Chúng ta có thể dễ dàng ghi đè các style cơ bản khi cần thiết, như tiêu đề đặc biệt này */}
          <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] text-secondary text-4xl sm:text-6xl lg:text-7xl">
            {t('subtitle')}
          </h1>
          <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] max-w-xl lg:text-xl xl:max-w-2xl xl:text-left">
            {t('description')}
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-center xl:justify-start gap-4">
            <SmartButton text={t('services')} href="#services" />
            {/* <SmartButton text={t('contact_us')} href="#contact" /> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;