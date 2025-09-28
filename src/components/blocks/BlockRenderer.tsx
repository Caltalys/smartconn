"use client";

import { AnyContentBlock } from "@/types/strapi/blocks/content-blocks";
import {
  isImageBlock,
  isListItemBlock,
  isMediaBlock,
  isQuoteBlock,
  isRichTextBlock,
  isRichtextImageBlock,
  isRichtextVideoBlock,
  isSliderBlock,
  isVideoBlock,
} from "@/utils/type-guards";
import ImageComponent from "../shared/ImageComponent";
import ListItem from "../shared/ListItem";
import MediaComponent from "../shared/MediaComponent";
import Quote from "../shared/Quote";
import RichText from "../shared/RichText";
import RichtextImage from "../shared/RichtextImage";
import RichtextVideo from "../shared/RichtextVideo";
import SliderComponent from "../shared/SliderComponent";
import VideoComponent from "../shared/VideoComponent";

interface BlockRendererProps {
  blocks: AnyContentBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        if (isQuoteBlock(block)) {
          return <Quote key={key} pretitle={block.title} quote={block.quote} author={block.author ?? ""} />;
        }
        if (isRichTextBlock(block)) {
          return <RichText key={key} data={block.body} />;
        }
        if (isImageBlock(block)) {
          return <ImageComponent key={key} data={block} />;
        }
        if (isSliderBlock(block)) {
          return <SliderComponent key={key} slides={block.slides} />;
        }
        if (isVideoBlock(block)) {
          return <VideoComponent key={key} data={block} />;
        }
        if (isMediaBlock(block)) {
          return <MediaComponent key={key} file={block.file ?? null} />;
        }
        if (isRichtextImageBlock(block)) {
          return <RichtextImage key={key} data={block} />;
        }
        if (isRichtextVideoBlock(block)) {
          return <RichtextVideo key={key} data={block} />;
        }
        if (isListItemBlock(block)) {
          return <ListItem key={key} data={block} />;
        }
        return null;
      })}
    </>
  );
}