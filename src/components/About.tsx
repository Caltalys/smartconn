import { useTranslations } from "next-intl";
import Pretitle from "./Pretitle"

const About = () => {
  const t = useTranslations('about_us');


  return (
    <section id="about" className="pt-16 xl:pt-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col xl:flex-row xl:items-center gap-12 xl:gap-0 ">
          <div className="flex-1">
            <div>
              <Pretitle text={t('title')} center={true} />
              <h2 className="mb-6">{t('subtitle')}</h2>
              <h2 className="mb-6">{t('description')}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About