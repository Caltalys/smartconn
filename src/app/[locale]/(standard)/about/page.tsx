import { fetchAboutPage } from "@/lib/api/api-about";
import PageRenderer from "@/components/blocks/PageRenderer";
import { notFound } from "next/navigation";
import Pretitle from "@/components/elements/Pretitle";
import { AsyncBaseProps } from "@/types/global";

export default async function AboutPage(params : AsyncBaseProps) {
  // Lấy dữ liệu từ Strapi trên server
  const { locale } = await params.params;
  const aboutData = await fetchAboutPage(locale);

  if (!aboutData) {
    notFound();
  }

  const { title, subtitle, blocks } = aboutData;
  console.log(blocks);

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <Pretitle text={title} center/>
        <h1 className="mt-4 font-bold text-4xl uppercase">{subtitle}</h1>
      </header>

      {/*
        Sử dụng PageRenderer để render linh hoạt cả sections và content blocks.
        Dữ liệu `blocks` đã được ánh xạ ở tầng API để tương thích.
      */}
      <PageRenderer sections={blocks} />
    </main>
  );
}