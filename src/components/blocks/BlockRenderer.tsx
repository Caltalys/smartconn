"use client";

import {
  AnySharedBlock,
  SharedImageBlock,
  SharedListItemBlock,
  SharedMediaBlock,
  SharedQuoteBlock,
  SharedRichTextBlock,
  SharedRichtextImageBlock,
  SharedRichtextVideoBlock,
  SharedSliderBlock,
  SharedVideoBlock,
} from "@/types/strapi/blocks/shared";
import dynamic from "next/dynamic";
import { Fragment, JSX } from "react";
import LoadingBlock from "../shared/LoadingBlock";

// Tải động các component block để chia nhỏ mã nguồn (code-splitting).
// Điều này đảm bảo mã JavaScript cho một block chỉ được tải khi nó thực sự được render.
const blockComponents = {
  RichText: dynamic(() => import("../shared/RichText"), { loading: () => <LoadingBlock /> }),
  Quote: dynamic(() => import("../shared/Quote"), { loading: () => <LoadingBlock /> }),
  Slider: dynamic(() => import("../shared/SliderComponent"), { ssr: false, loading: () => <LoadingBlock /> }),
  ListItem: dynamic(() => import("../shared/ListItem"), { loading: () => <LoadingBlock /> }),
  Video: dynamic(() => import("../shared/VideoComponent"), { loading: () => <LoadingBlock /> }),
  Media: dynamic(() => import("../shared/MediaComponent"), { loading: () => <LoadingBlock /> }),
  RichtextImage: dynamic(() => import("../shared/RichtextImage"), { loading: () => <LoadingBlock /> }),
  RichtextVideo: dynamic(() => import("../shared/RichtextVideo"), { loading: () => <LoadingBlock /> }),
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <Fragment>
      {blocks.map((block): JSX.Element | null => {
        const key = `${block.__component}-${block.id}`;
        switch (block.__component) {
          case "shared.rich-text":
            return <blockComponents.RichText key={key} body={(block as SharedRichTextBlock).body} />;
          case "shared.quote":
            return <blockComponents.Quote key={key} quote={(block as SharedQuoteBlock).quote} author={(block as SharedQuoteBlock).author ?? undefined} />;
          case "shared.slider":
            return <blockComponents.Slider key={key} slides={(block as SharedSliderBlock).slides} />;
          case "shared.list-item":
            return <blockComponents.ListItem key={key} data={block as SharedListItemBlock} />;
          case "shared.video":
            return <blockComponents.Video key={key} data={block as SharedVideoBlock} />;
          case "shared.image":
            return <blockComponents.Media key={key} file={(block as SharedImageBlock).image} />;
          case "shared.media":
            return <blockComponents.Media key={key} file={(block as SharedMediaBlock).file} />;
          case "shared.richtext-image":
            return <blockComponents.RichtextImage key={key} data={block as SharedRichtextImageBlock} />;
          case "shared.richtext-video":
            return <blockComponents.RichtextVideo key={key} data={block as SharedRichtextVideoBlock} />;
          default:
            return null;
        }
      })}
    </Fragment>
  );
}

interface BlockRendererProps {
  blocks: AnySharedBlock[];
}