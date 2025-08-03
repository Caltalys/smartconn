import { useTranslations } from "next-intl";
import Pretitle from "./Pretitle";

const Services = () => {
  const t = useTranslations('services');
  const items = t.raw('items') as { id: string; title: string; description: string }[];

  return (
    <section id="services" className="py-16 xl:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Pretitle text={t('title')} center={true} />
          <h2 className="mb-4">{t('subtitle')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} id={`service-${item.id}`} className="p-8 bg-primary-foreground border border-border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-secondary">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services