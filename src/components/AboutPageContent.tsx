'use client';

import { AboutPage } from '@/lib/types';
import BlockRenderer from '@/components/blog/BlockRenderer';
import BlockHeader from './sections/BlockHeader';
import TextGrid, { TextGridProps } from './sections/TextGrid';
import { title } from 'process';

/**
 * AboutPageContent là một trình render động.
 * Nó sử dụng BlockRenderer để lặp qua mảng `blocks` (Dynamic Zone) từ API 
 * và render component tương ứng cho mỗi section.
 */
const AboutPageContent = ({ data }: { data: AboutPage | null }) => {
  // Nếu không có dữ liệu hoặc không có blocks (sections), không render gì cả.
  // Trang cha (page.tsx) nên xử lý trường hợp "not found".
  if (!data || !data.blocks || data.blocks.length === 0) {
    return null;
  }

  const headline = { pretitle: data.headline.headline, title: data.headline.subheadline };

const features: TextGridProps["data"] = {
  items: data.features.map(feature => ({
    title: feature.heading ?? "",
    text: feature.description ?? "",
  })),
};



  return (
    <main>
      <BlockHeader data={headline} />
      <BlockRenderer blocks={data.blocks} />
      <TextGrid data={features} />
    </main>
  );
};

export default AboutPageContent;