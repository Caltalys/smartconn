import PageRenderer from "@/components/blocks/PageRenderer";
import Pretitle from "@/components/elements/Pretitle";
import { fetchAboutPage } from "@/lib/api/api-about";
import { AsyncBaseProps } from "@/types/global";
import { notFound } from "next/navigation";

// Ép buộc trang này phải được render động (SSR)
//export const dynamic = "force-dynamic";

export default async function AboutPage(params: AsyncBaseProps) {
  // Lấy dữ liệu từ Strapi trên server
  const { locale } = await params.params;
  const aboutData = await fetchAboutPage(locale);

  if (!aboutData) {
    notFound();
  }

  const { title, subtitle, blocks } = aboutData;

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <Pretitle text={title} center />
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