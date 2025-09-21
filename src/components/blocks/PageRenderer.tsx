import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import { AnyContentBlock } from '@/types/strapi/single/page';
import { AnySharedBlock } from '@/types/strapi/blocks/shared';
import Advantages from '../sections/Advantages';
import Blog from '../sections/Blog';
import Partners from '../sections/Partners';
import Services from '../sections/Services';
import BlockRenderer from './BlockRenderer';
import React, { JSX } from 'react';

interface PageRendererProps {
    sections: AnyContentBlock[];
}

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
    'sections.hero': Hero,
    'sections.about': About,
    'sections.advantages': Advantages,
    'sections.services': Services,
    'sections.partners': Partners,
    'sections.blog': Blog,
};

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
                <section key={`shared-group-${key}`} className="container mx-auto px-4 py-8">
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

            const Component = sectionComponents[section.__component];

            if (Component) {
                content.push(<Component key={key} data={section} />);
            } else if (process.env.NODE_ENV === 'development') {
                console.warn(`PageRenderer: Không tìm thấy component cho section loại "${section.__component}".`);
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