import { strapiClient } from "../strapi-client";
import { HeroSection, StrapiHeroSection } from "@/types/strapi/sections/hero";
import { Slide, StrapiSlide } from "@/types/strapi/elements/slide";
import { StrapiLink, Link } from "@/types/strapi/elements/link";
import { getStrapiMedia } from "../utils";
import { AboutSectionData, StrapiAboutSection } from "@/types/strapi/sections/about";
import { AdvantagesSectionData, StrapiAdvantagesSection } from "@/types/strapi/sections/advantages";
import { FeatureItem, ServicesSectionData, StrapiFeatureItem, StrapiServicesSection } from "@/types/strapi/sections/services";
import { PartnerItem, PartnersSectionData, StrapiPartnerItem, StrapiPartnersSection } from "@/types/strapi/sections/partners";
import { BlogSectionData, StrapiBlogSection } from "@/types/strapi/sections/blog";
import { Icon, StrapiIcon } from "@/types/strapi/elements/icon";
import { getAllArticles } from ".";
import { AnyContentBlock, AnyStrapiContentBlock, Page, PageCollectionResponse, StrapiPage } from "@/types/strapi/single/page";
import { SharedImageBlock, SharedListItemBlock, SharedMediaBlock, SharedQuoteBlock, SharedRichTextBlock, SharedRichtextImageBlock, SharedRichtextVideoBlock, SharedSliderBlock, SharedVideoBlock } from "@/types/strapi/blocks/shared";

// --- Section Mappers ---

/**
 * Ánh xạ một Strapi Link component thành một Link object cho frontend.
 */
function mapLink(strapiLink: StrapiLink): Link {
    return {
        id: strapiLink.id,
        label: strapiLink.text,
        href: strapiLink.url,
        target: strapiLink.target,
        isExternal: strapiLink.isExternal,
    };
}

/**
 * Ánh xạ dữ liệu thô của Hero Section từ Strapi.
 */
function mapHeroSection(section: StrapiHeroSection): HeroSection {
    // Transformer đã xử lý cấu trúc cơ bản.
    // Chúng ta chỉ cần ánh xạ các component lồng nhau như CTAs.
    return {
        ...section,
        ctas: (section.ctas || []).map(mapLink),
        // mediaImage, mediaVideo, mediaSlider được giả định là đã có cấu trúc đúng
        // nhờ vào populate query và transformer.
    };
}

/**
 * Ánh xạ dữ liệu thô của About Section từ Strapi.
 */
function mapAboutSection(section: StrapiAboutSection): AboutSectionData {

    return {
        __component: section.__component,
        id: section.id,
        pretitle: section.title || "",
        title: section.heading,
        description: section.description || "",
        ctas: (section.ctas || []).map(mapLink),
        // Cung cấp một ảnh fallback nếu không có ảnh từ Strapi
        imageUrl: getStrapiMedia(section.image?.url) || "/shark-ana.jpg",
        imageAlt: section.image?.alternativeText || section.heading,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Icon component.
 */
function mapIcon(icon: StrapiIcon): Icon {
    return {
        id: icon.id,
        name: icon.name || "",
        // Lấy URL của ảnh nếu có
        imageUrl: getStrapiMedia(icon.iconImage?.url),
        // Lấy nội dung SVG nếu có
        svgContent: icon.svgContent || null,
        // Lấy tên của react-icon nếu có
        iconName: icon.iconName || null,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Feature Item (dùng trong Services Section).
 */
function mapFeatureItem(item: StrapiFeatureItem): FeatureItem {
    return {
        id: item.id,
        title: item.heading,
        description: item.description || "",
        imageUrl: getStrapiMedia(item.image?.url) || "/service-placeholder.jpg",
        imageAlt: item.image?.alternativeText || item.heading,
        // Cung cấp fallback an toàn nếu cta không tồn tại
        cta: item.cta ? mapLink(item.cta) : { id: 0, href: '#', label: 'Learn More', isExternal: false, target: '_self' }, // Giữ nguyên fallback
        icon: item.icon ? mapIcon(item.icon) : null,
    };
}

/**
 * Ánh xạ dữ liệu thô của Services Section từ Strapi.
 */
function mapServicesSection(section: StrapiServicesSection): ServicesSectionData {
    return {
        __component: section.__component,
        id: section.id,
        pretitle: section.title || "",
        title: section.heading,
        services: (section.services || []).map(mapFeatureItem),
    };
}

/**
 * Ánh xạ dữ liệu thô của Advantages Section từ Strapi.
 */
function mapAdvantagesSection(section: StrapiAdvantagesSection): AdvantagesSectionData {
    return {
        __component: section.__component,
        id: section.id,
        pretitle: section.title || "", // `title` từ Strapi là `pretitle`
        title: section.heading, // `heading` từ Strapi là `title`
        description: section.description || "",
        items: (section.items || []).map(mapFeatureItem), // Tái sử dụng mapFeatureItem
    };
}

/**
 * Ánh xạ dữ liệu thô của một Partner Item.
 */
function mapPartnerItem(item: StrapiPartnerItem): PartnerItem {
    return {
        id: item.id,
        name: item.heading,
        href: item.href || '#',
        logoUrl: getStrapiMedia(item.image?.url) || "/placeholder.png", // Cần có ảnh placeholder
        alt: item.image?.alternativeText || item.heading,
    };
}

/**
 * Ánh xạ dữ liệu thô của Partners Section từ Strapi.
 */
function mapPartnersSection(section: StrapiPartnersSection): PartnersSectionData {
    return {
        __component: section.__component,
        id: section.id,
        pretitle: section.title || "",
        title: section.heading,
        items: (section.items || []).map(mapPartnerItem),
    };
}

/**
 * Ánh xạ dữ liệu thô của Blog Section từ Strapi.
 * Hàm này bất đồng bộ vì nó cần fetch danh sách bài viết mới nhất.
 */
async function mapBlogSection(section: StrapiBlogSection, locale: string): Promise<BlogSectionData> {
    const numberOfPosts = section.numberOfPosts || 3; // Mặc định lấy 3 bài viết

    // Gọi API để lấy các bài viết mới nhất.
    // Giả định rằng `getAllArticles` có thể được gọi từ đây.
    const articlesResponse = await getAllArticles(locale, {
        page: 1,
        pageSize: numberOfPosts,
    });

    return {
        __component: section.__component,
        id: section.id,
        pretitle: section.title || "",
        title: section.heading,
        articles: articlesResponse.data, // Giả sử getAllArticles trả về { data: Article[], meta: ... }
        viewAllButtonLabel: section.viewAllButtonLabel || "View All Articles",
    };
}

// --- Shared Block Mappers ---

// Helper function to convert Strapi's blocks to Markdown
function blocksToMarkdown(blocks: any[] | null): string {
    if (!blocks) return "";
    return blocks.map(block => {
        switch (block.type) {
            case 'paragraph':
                return block.children.map((child: any) => {
                    let text = child.text;
                    if (child.bold) text = `**${text}**`;
                    if (child.italic) text = `*${text}*`;
                    if (child.underline) text = `<u>${text}</u>`;
                    return text;
                }).join('');
            case 'heading':
                return `${'#'.repeat(block.level)} ${block.children.map((child: any) => child.text).join('')}`;
            case 'list':
                const listChar = block.format === 'ordered' ? '1.' : '*';
                return block.children.map((listItem: any, index: number) => 
                    `${block.format === 'ordered' ? `${index + 1}.` : '*'} ${listItem.children.map((child: any) => child.text).join('')}`
                ).join('\n');
            default:
                if (process.env.NODE_ENV === 'development') {
                    console.warn(`blocksToMarkdown: Unknown block type "${block.type}"`);
                }
                return '';
        }
    }).join('\n\n');
}

/**
 * Ánh xạ dữ liệu thô của một Quote Block.
 */
function mapSharedQuote(block: any): SharedQuoteBlock {
    return {
        id: block.id,
        __component: 'shared.quote',
        quote: block.body || "",
        author: block.author || null,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Rich Text Block.
 */
function mapSharedRichText(block: any): SharedRichTextBlock {
    return {
        id: block.id,
        __component: 'shared.rich-text',
        body: block.body || "",
    };
}

/**
 * Ánh xạ dữ liệu thô của một Slide.
 */
function mapSlide(slide: StrapiSlide): Slide {
    return {
        id: slide.id,
        image: slide.image, // Giả định transformer đã làm phẳng
        alternativeText: slide.alternativeText || null,
        caption: slide.caption || null,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Slider Block.
 */
function mapSharedSlider(block: any): SharedSliderBlock {
    return {
        id: block.id,
        __component: 'shared.slider',
        slides: (block.slides || []).map(mapSlide),
    };
}

/**
 * Ánh xạ dữ liệu thô của một List Item Block.
 */
function mapSharedListItem(block: any): SharedListItemBlock {
    return {
        id: block.id,
        __component: 'shared.list-item',
        pretitle: block.title || "",
        title: block.heading || "",
        itemJustify: block.itemJustify || 'center',
        items: (block.items || []).map(mapFeatureItem), // Tái sử dụng mapFeatureItem
    };
}

/**
 * Ánh xạ dữ liệu thô của một Video Block.
 */
function mapSharedVideo(block: any): SharedVideoBlock | null {
    if (!block) {
        return null;
    }
    return {
        id: block.id,
        __component: 'shared.video',
        youtubeId: block.youtubeId,
        layout: block.layout || null,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Image Block.
 */
function mapSharedImage(block: any): SharedImageBlock {
    return {
        id: block.id,
        __component: 'shared.image',
        image: block.image,
        alternativeText: block.alternativeText || null,
        layout: block.layout || null,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Media Block.
 */
function mapSharedMedia(block: any): SharedMediaBlock {
    // Dữ liệu đã được transformer làm phẳng, chỉ cần đảm bảo đúng kiểu.
    return {
        id: block.id,
        __component: 'shared.media',
        file: block.file,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Richtext Video Block.
 */
function mapSharedRichtextVideo(block: any): SharedRichtextVideoBlock | null {
    console.log(block);

    const mappedVideo = mapSharedVideo(block.video);
    if (!mappedVideo) {
        console.warn(`mapSharedRichtextVideo: 'video' component is missing, not populated, or invalid for block id ${block.id}. This block will be skipped.`);
        return null;
    }
    
    return {
        id: block.id,
        __component: 'shared.richtext-video',
        pretitle: block.title || "",
        title: block.heading || "",
        content: blocksToMarkdown(block.content),
        video: mappedVideo,
    };
}

/**
 * Ánh xạ dữ liệu thô của một Richtext Image Block.
 */
function mapSharedRichtextImage(block: any): SharedRichtextImageBlock {
    return {
        id: block.id,
        __component: 'shared.richtext-image',
        pretitle: block.title || "",
        title: block.heading || "",
        content: blocksToMarkdown(block.content),
        image: block.image, // Đã có định dạng Media đúng
    };
}

/**
 * Ánh xạ một mảng các section thô từ Strapi sang mảng section cho frontend.
 * Hoạt động như một bộ định tuyến mapper.
 * LƯU Ý: Hàm này đã được chuyển thành `async` để hỗ trợ các section cần fetch dữ liệu riêng (như Blog).
 */
export async function mapContentSections(sections: AnyStrapiContentBlock[], locale: string): Promise<AnyContentBlock[]> {
    if (!sections) return [];

    const mappedSectionPromises = sections.map(section => {
        switch (section.__component) {
            // Section Mappers
            case 'sections.hero':
                return Promise.resolve(mapHeroSection(section));
            case 'sections.about':
                return Promise.resolve(mapAboutSection(section));
            case 'sections.services':
                return Promise.resolve(mapServicesSection(section));
            case 'sections.advantages':
                return Promise.resolve(mapAdvantagesSection(section));
            case 'sections.partners':
                return Promise.resolve(mapPartnersSection(section));
            case 'sections.blog':
                return mapBlogSection(section, locale); // Async mapper

            // Shared Block Mappers
            case 'shared.quote':
                return Promise.resolve(mapSharedQuote(section));
            case 'shared.rich-text':
                return Promise.resolve(mapSharedRichText(section));
            case 'shared.slider':
                return Promise.resolve(mapSharedSlider(section));
            case 'shared.list-item':
                return Promise.resolve(mapSharedListItem(section));
            case 'shared.video':
                return Promise.resolve(mapSharedVideo(section));
            case 'shared.image':
                return Promise.resolve(mapSharedImage(section));
            case 'shared.media':
                return Promise.resolve(mapSharedMedia(section));
            case 'shared.richtext-video':
                return Promise.resolve(mapSharedRichtextVideo(section as any));
            case 'shared.richtext-image':
                return Promise.resolve(mapSharedRichtextImage(section));

            default:
                if (process.env.NODE_ENV === 'development') {
                    // Không sủa dòng log này
                    console.warn(`mapContentSections: Không tìm thấy mapper cho component loại "${(section as { __component: string }).__component}". Section này sẽ được bỏ qua.`);
                }
                return Promise.resolve(null);
        }
    });

    // Chờ tất cả các promise được giải quyết
    const mappedSections = await Promise.all(mappedSectionPromises);

    // Lọc ra các section null (không được ánh xạ)
    return mappedSections.filter((section): section is AnyContentBlock => section !== null);
}


// --- Page Mapper ---

/**
 * Ánh xạ dữ liệu thô của một trang (Page) từ Strapi sang cấu trúc dữ liệu sạch cho frontend.
 * LƯU Ý: Hàm này đã được chuyển thành `async` để chờ `mapContentSections`.
 */
async function mapPage(strapiPage: StrapiPage, locale: string): Promise<Page> {
    return {
        id: strapiPage.id,
        title: strapiPage.title,
        slug: strapiPage.slug,
        metaTitle: strapiPage.metaTitle,
        metaDescription: strapiPage.metaDescription,
        metaImage: strapiPage.metaImage,
        contentSections: await mapContentSections(strapiPage.contentSections, locale),
    };
}

// --- API Fetcher ---

/**
 * Lấy dữ liệu của một trang duy nhất từ Strapi dựa vào slug.
 * @param slug - Slug của trang cần lấy.
 * @param locale - Ngôn ngữ của nội dung.
 * @returns Dữ liệu trang đã được ánh xạ hoặc null nếu không tìm thấy.
 */
export async function fetchPageBySlug(slug: string, locale: string): Promise<Page | null> {
    const client = strapiClient(locale);
    try {
        const response = await client.collection('pages').find({
            filters: { slug: { $eq: slug } },
            locale,
            populate: {
                contentSections: {
                    on: {
                        'sections.hero': {
                            populate: { ctas: true, mediaImage: { populate: { image: true } }, mediaVideo: true, mediaSlider: { populate: { slides: { populate: { image: true } } } } }
                        },
                        'sections.about': {
                            populate: { ctas: true, image: true }
                        },
                        'sections.services': {
                            populate: {
                                services: {
                                    populate: {
                                        image: true,
                                        cta: true
                                    }
                                }
                            }
                        },
                        'sections.advantages': {
                            populate: {
                                items: {
                                    populate: {
                                        image: true,
                                        cta: true,
                                        icon: {
                                            populate: {
                                                iconImage: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        'sections.partners': {
                            populate: {
                                items: {
                                    populate: {
                                        image: true
                                    }
                                }
                            }
                        },
                        'shared.image': { populate: { image: true } },
                        'shared.media': { populate: { file: true } },
                        'shared.slider': {
                            populate: {
                                slides: {
                                    populate: { image: true }
                                }
                            }
                        },
                        'shared.list-item': { populate: { items: { populate: { image: true, cta: true, icon: { populate: { iconImage: true } } } } } },
                        'shared.richtext-video': { populate: { video: true } },
                        'shared.richtext-image': { populate: { image: true } }
                    },
                },
                metaImage: true,
            },
        }) as unknown as PageCollectionResponse;
        if (!response.data || response.data.length === 0) { return null; }

        // Gọi phiên bản async của mapPage và truyền locale vào
        return await mapPage(response.data[0], locale);
    } catch (error) {
        console.error(`API Error: Could not fetch page with slug "${slug}".`, error);
        return null;
    }
}