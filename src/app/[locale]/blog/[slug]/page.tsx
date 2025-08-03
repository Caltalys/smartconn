import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowLeftLine } from 'react-icons/ri';

type Props = {
    params: {
        slug: string;
        locale: string;
    };
};

// Define the type for a blog post item to ensure type safety
type BlogPost = {
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
    content: string;
    slug: string;
};

/**
 * Generates metadata for the blog post page, enhancing SEO.
 * It fetches the specific post by its slug and sets the page title and description.
 */
export async function generateMetadata({ params: { slug, locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'blog' });
    const items: BlogPost[] = t.raw('items');
    const post = items.find((item) => item.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found'
        };
    }

    return {
        title: `${post.title} | SmartConn`,
        description: post.description,
    };
}

/**
 * The main component for displaying a single blog post.
 * It fetches the post data based on the slug from the URL parameters.
 */
export default async function BlogPostPage({ params: { slug, locale } }: Props) {
    // Enable static rendering for i18n
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'blog' });
    const items: BlogPost[] = t.raw('items');
    const post = items.find((item) => item.slug === slug);

    // If no post is found for the given slug, render the 404 page.
    if (!post) {
        notFound();
    }

    return (
        <main className="py-16 xl:py-24 bg-primary/5">
            <div className="container mx-auto px-6">
                <article className="max-w-4xl mx-auto">
                    {/* Back to Blog Link */}
                    <div className="mb-8">
                        <Link href="/#blog" className="inline-flex items-center gap-2 text-accent hover:underline font-semibold">
                            <RiArrowLeftLine />
                            {t('back_to_blog')}
                        </Link>
                    </div>

                    {/* Post Header */}
                    <header className="mb-8">
                        <p className="text-accent font-semibold mb-2">{post.category}</p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
                            {post.title}
                        </h1>
                        <p className="text-muted-foreground">{post.date}</p>
                    </header>

                    {/* Featured Image */}
                    <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
                        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
                    </div>

                    {/* Post Content */}
                    <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-primary prose-strong:text-primary prose-a:text-accent hover:prose-a:underline">
                        {post.content.split('\n\n').map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
                    </div>
                </article>
            </div>
        </main>
    );
}

