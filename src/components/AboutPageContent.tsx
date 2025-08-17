'use client';

import { AboutPage } from '@/lib/types';
import BlockRenderer from '@/components/blog/BlockRenderer';
import BlockHeader from './sections/BlockHeader';
import TextGrid, { TextGridProps } from './sections/TextGrid';

/**
 * AboutPageContent là một trình render động.
 * Nó sử dụng BlockRenderer để lặp qua mảng `blocks` (Dynamic Zone) từ API 
 * và render component tương ứng cho mỗi section.
 */
const AboutPageContent = ({ data }: { data: AboutPage | null }) => {
  if (!data) {
    return null;
  }

  // Truy cập các thuộc tính lồng nhau một cách an toàn bằng optional chaining.
  const headline = {
    pretitle: data.headline?.headline,
    title: data.headline?.subheadline,
  };

  const featuresData: TextGridProps["data"] | undefined = data.features ? {
    items: data.features.map((feature) => ({
      title: feature.heading ?? "",
      text: feature.description ?? "",
    })),
  } : undefined;

  return (
    <main>
      {headline && <BlockHeader pretitle={data.headline?.headline} title={data.headline?.subheadline} />}
      {data.blocks && data.blocks.length > 0 && <BlockRenderer blocks={data.blocks} />}
      {featuresData && <TextGrid data={featuresData} />}
    </main>
  );
};

export default AboutPageContent;