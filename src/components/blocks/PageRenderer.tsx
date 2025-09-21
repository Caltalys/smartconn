import Hero from '@/components/sections/Hero';
// Import các section component khác sẽ được thêm vào đây
import About from '@/components/sections/About';
import { AnyContentBlock, SectionComponent } from '@/types/strapi/single/page';
import Advantages from '../sections/Advantages';
import Blog from '../sections/Blog';
import Partners from '../sections/Partners';
import Services from '../sections/Services';
import BlockRenderer from './BlockRenderer';
import { Block } from '@/types/strapi/strapi';
import { JSX } from 'react';

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
    let sharedBlocksBuffer: Block[] = [];

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

        if (section.__component?.startsWith('sections.')) {
            flushSharedBlocks(index); // Xả buffer block dùng chung trước khi render section mới
            const sectionData = section as SectionComponent;
            switch (sectionData.__component) {
                case 'sections.hero':
                    content.push(<Hero key={key} data={sectionData} />);
                    break;
                case 'sections.about':
                    content.push(<About key={key} data={sectionData} />);
                    break;
                case 'sections.advantages':
                    content.push(<Advantages key={key} data={sectionData} />);
                    break;
                case 'sections.services':
                    content.push(<Services key={key} data={sectionData} />);
                    break;
                case 'sections.partners':
                    content.push(<Partners key={key} data={sectionData} />);
                    break;
                case 'sections.blog':
                    content.push(<Blog key={key} data={sectionData} />);
                    break;
                default:
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(`PageRenderer: Không tìm thấy component cho section loại "${section.__component}".`);
                    }
                    break;
            }
        } else {
            sharedBlocksBuffer.push(section as Block);
        }
    });

    flushSharedBlocks('last'); // Xả nốt buffer còn lại ở cuối

    return (
        <main>{content}</main>
    );
};

export default PageRenderer;