import { useTranslations } from "next-intl";
import Pretitle from "./Pretitle";
import Image from "next/image";
import SmartButton from "./SmartButton";

const About = () => {
  const t = useTranslations('about_us');
  const tCommon = useTranslations('common');
  const tContact = useTranslations('contact');

  return (
    <section id="about" className="py-16 xl:py-32">
      <div className="container mx-auto px-6">
        {/* Sử dụng grid để có layout 2 cột đơn giản và mạnh mẽ hơn */}
        {/* Giảm khoảng cách, đảo ngược thứ tự cột để ảnh hiển thị trước trên mobile */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* text block */}
          {/* Căn giữa trên mobile, căn trái trên desktop */}
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left order-2 xl:order-none">
            <Pretitle text={t('title')} />
            <h2 className="mb-6">{t('subtitle')}</h2>
            {/* Dùng <p> cho mô tả sẽ đúng ngữ nghĩa hơn <h3> */}
            <p className="mb-8 text-muted-foreground max-w-lg">{t('description')}</p>
            {/* Nút liên hệ nên trỏ đến khu vực footer */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
              <SmartButton text={tContact('contact_us')} href="#footer" />
              {/* <SmartButton text={tCommon('more')} href="#footer" /> */}
            </div>
          </div>

          {/* image block */}
          {/* Dùng flex để căn giữa ảnh trong ô grid */}
          <div className="flex items-center justify-center order-1 xl:order-none">
            {/* Container ảnh giờ sẽ rộng hơn trên mobile để tận dụng không gian */}
            <div className="relative w-full max-w-md xl:w-full xl:max-w-none aspect-[4/3]">
              {/* Khối trang trí nền */}
              <div className="flex w-full h-full bg-secondary absolute -top-3 -left-3 -z-10 rounded-md"></div>
              <Image
                src={"/about.jpg"}
                alt={t('subtitle')}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1279px) 448px, 40vw"
                className="object-cover rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;