import { useTranslations } from "next-intl";
import Pretitle from "./Pretitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SmartButton from "./SmartButton";

const Services = () => {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');

  const items = t.raw('items') as { id: string; title: string; description: string; image: string, url: string }[];

  if (!items || items.length === 0) {
    return (
      <section id="services" className="py-16 xl:py-32">
        <div className="container mx-auto px-6 text-center">
          <p>No services available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 xl:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Pretitle text={t('title')} center={true} />
          <h2 className="mb-4">{t('subtitle')}</h2>
        </div>
        <Tabs defaultValue={items[0].id} className="w-full flex flex-col lg:flex-row items-start gap-12">
          {/* Danh sách các thẻ dịch vụ */}
          <div className="w-full lg:w-1/3">
            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-4 rounded-none overflow-hidden">
              {items.map((item) => (
                <TabsTrigger key={item.id} value={item.id}
                  // Thêm whitespace-normal để cho phép văn bản xuống dòng, điều chỉnh padding và chiều cao để linh hoạt hơn.
                  className="flex w-full p-4 sm:p-6 border border-primary/20 bg-primary/10 data-[state=active]:bg-secondary/80 data-[state=active]:border-2 data-[state=active]:border-secondary transition-all duration-300 rounded-none whitespace-normal">
                  <div className="w-full h-full flex items-center justify-center lg:justify-start">
                    {/* Căn chỉnh lại văn bản và làm cho font chữ responsive hơn */}
                    <p className="text-sm sm:text-base font-bold text-primary uppercase text-center lg:text-left">{item.title}</p>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Phần hiển thị chi tiết dịch vụ */}
          <div className="w-full lg:w-2/3">
            {items.map((item) => (
              <TabsContent value={item.id} key={item.id} className="w-full m-0">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center h-full">
                  {/* Hình ảnh */}
                  <div className="relative w-full h-[300px] xl:h-[460px]">
                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      className="object-cover rounded-lg shadow-lg"
                      sizes="(max-width: 1279px) 90vw, 45vw"
                    />
                  </div>
                  {/* Văn bản */}
                  <div className="text-center xl:text-left">
                    <h3 className="text-2xl xl:text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-base xl:text-lg text-muted-foreground mb-6">{item.description}</p>
                    {/* button */}
                    <div className="w-full flex xl:items-center justify-center xl:justify-start gap-4">
                      <SmartButton text={tCommon('more')} href={item.url} />
                    </div>
                  </div>

                </div>
              </TabsContent>
            ))}
          </div>


        </Tabs>
      </div>
    </section>
  )
}

export default Services