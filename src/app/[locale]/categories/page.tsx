import { getAllCategories } from "@/lib/api";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type CategoriesPageProps = {
    params: {
        locale: string;
    };
};

export default async function CategoriesPage({
    params: { locale },
}: CategoriesPageProps) {
    const categories = await getAllCategories(locale);
    const t = await getTranslations({ locale, namespace: "blog" });

    return (
        <main>
            <section className="relative py-24 md:py-32 bg-primary/5">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        {t("categoriesTitle")}
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t("categoriesSubtitle")}
                    </p>
                </div>
            </section>

            <section className="py-16 xl:py-24">
                <div className="container mx-auto px-6">
                    {categories.data && categories.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.data.map((category) => (
                                <Link
                                    href={`/${locale}/blog/category/${category.slug}`}
                                    key={category.id}
                                    className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all"
                                >
                                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {category.name}
                                    </h2>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {category.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">
                            {t("noCategoriesFound")}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}