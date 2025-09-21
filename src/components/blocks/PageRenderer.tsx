import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import { AnySharedBlock } from '@/types/strapi/blocks/shared';
import { AnyContentBlock } from '@/types/strapi/single/page';
import { JSX, Suspense } from 'react';
import Advantages from '../sections/Advantages';
import Blog from '../sections/Blog';
import Partners from '../sections/Partners';
import Services from '../sections/Services';
import BlockRenderer from './BlockRenderer';

interface PageRendererProps {
    sections: AnyContentBlock[];
}

/**
 * Component này chịu trách nhiệm render một danh sách các section
 * từ Dynamic Zone của Strapi. Nó hoạt động như một "bộ định tuyến"
 * ở tầng giao diện, chọn component React phù hợp để render
 * dựa trên thuộc tính `__component` của mỗi section.
 */
const PageRenderer = ({ sections }: PageRendererProps) => {
    if (!sections || sections.length === 0) {
        return null;
    }

    const content: JSX.Element[] = [];
    let sharedBlocksBuffer: AnySharedBlock[] = [];

    const flushSharedBlocks = (key: string | number) => {
        if (sharedBlocksBuffer.length > 0) {
            content.push(
                <section key={`shared-group-${key}`} className="container mx-auto px-4 py-8 max-w-4xl">
                    <BlockRenderer blocks={sharedBlocksBuffer} />
                </section>
            );
            sharedBlocksBuffer = [];
        }
    };

    sections.forEach((section, index) => {
        const key = `${section.__component}-${section.id}`;

        // Nếu không phải là section chính của trang, hãy đệm nó vào như một shared block.
        if (section.__component?.startsWith('sections.')) {
            // Đây là một section chính, vì vậy trước tiên hãy render bất kỳ shared block nào đã được đệm.
            flushSharedBlocks(index);

            // Bây giờ, render section chính bằng câu lệnh switch để đảm bảo an toàn kiểu.
            switch (section.__component) {
                case 'sections.hero':
                    content.push(<Hero key={key} data={section} />);
                    break;
                case 'sections.about':
                    content.push(<About key={key} data={section} />);
                    break;
                case 'sections.advantages':
                    content.push(<Advantages key={key} data={section} />);
                    break;
                case 'sections.services':
                    content.push(<Services key={key} data={section} />);
                    break;
                case 'sections.partners':
                    content.push(<Partners key={key} data={section} />);
                    break;
                case 'sections.blog':
                    // Bọc component Blog trong Suspense vì nó sử dụng useSearchParams
                    // để xử lý phân trang phía client. Điều này ngăn Next.js chuyển toàn bộ trang
                    // sang chế độ Client-Side Rendering (CSR) và giải quyết lỗi.
                    content.push(<Suspense key={key} fallback={<div className="text-center p-8">Đang tải bài viết...</div>}>
                        <Blog data={section} />
                    </Suspense>);
                    break;
                default:
                    const unhandledSection: AnyContentBlock = section;
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(`PageRenderer: Không tìm thấy component cho section loại "${unhandledSection.__component}".`);
                    }
            }
        } else {
            sharedBlocksBuffer.push(section as AnySharedBlock);
        }
    });

    flushSharedBlocks('last'); // Xả nốt buffer còn lại ở cuối

    // Sử dụng React.Fragment thay vì <main> để tránh lồng thẻ không hợp lệ.
    // Component cha (ví dụ: page.tsx) sẽ chịu trách nhiệm cung cấp thẻ <main>.
    return <>{content}</>;
};

export default PageRenderer;