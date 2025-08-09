import { getTranslations } from "next-intl/server";
import { getAllArticles } from "@/lib/api";
import { MotionDiv } from "@/components/MotionDiv";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Article, Articles } from "@/lib/types";
import ArticleCard from "@/components/blog/ArticleCard";

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const articlesResponse = await getAllArticles(locale);
  // The Strapi v4 API returns data in a nested structure, e.g., { id, attributes: { ... } }.
  // Our components expect a flattened structure. This transformation maps the API response
  // to the flat `Article` type our components use.
  const articles: Article[] = articlesResponse.data.map((item: any) => {
    const coverData = item.cover;
    const categoryData = item.category;
    const authorData = item.author;

    return {
      id: item.id,
      ...item,
      cover: coverData ? { id: coverData.id, ...coverData } : null,
      category: categoryData ? { id: categoryData.id, ...categoryData } : null,
      author: authorData ? { id: authorData.id, ...authorData } : null,
    };
  });

  return (
    <main>
      <section className="relative py-24 md:py-32 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <MotionDiv variants={fadeInUp} initial="hidden" animate="visible">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </MotionDiv>
        </div>
      </section>

      <section className="py-16 xl:py-24">
        <div className="container mx-auto px-6">
          {articles && articles.length > 0 ? (
            <MotionDiv
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article) => (
                <MotionDiv key={article.id} variants={fadeInUp}>
                  <ArticleCard
                    article={article}
                    locale={locale}
                    readMoreText={t("read_more")}
                  />
                </MotionDiv>
              ))}
            </MotionDiv>
          ) : (
            <p className="text-center text-muted-foreground">{t("noArticlesFound")}</p>
          )}
        </div>
      </section>
    </main>
  );
}
