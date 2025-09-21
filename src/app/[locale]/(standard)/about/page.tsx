import { fetchAboutPage } from "@/lib/api/api-about";
import PageRenderer from "@/components/blocks/PageRenderer";
import { notFound } from "next/navigation";

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  // Lấy dữ liệu từ Strapi trên server
  const aboutData = await fetchAboutPage(locale);

  if (!aboutData) {
    notFound();
  }

  const { title, subtitle, blocks } = aboutData;

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
      </header>

      {/*
        Sử dụng PageRenderer để render linh hoạt cả sections và content blocks.
        Dữ liệu `blocks` đã được ánh xạ ở tầng API để tương thích.
      */}
      <PageRenderer sections={blocks} />
    </main>
  );
}