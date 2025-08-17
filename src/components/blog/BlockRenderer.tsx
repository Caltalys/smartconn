"use client";

import Image from "next/image";
import React, { Fragment } from "react";
import { getStrapiMedia } from "@/lib/utils";
import { Block, Media } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageText, { ImageTextProps } from "../sections/ImageText";
import TextGrid, { TextGridProps } from "../sections/TextGrid";
import ReactMarkdown from "react-markdown";

// interface ImageTextBlock {
//   __component: "shared.image-text";
//   id: number;
//   headline?: Headline;
//   title: string;
//   text: string;
//   image: Media;
//   imagePosition?: 'Left' | 'Right';
//   cta?: {
//     label: string;
//     href: string;
//   };
// }

// interface TextGridBlock {
//   __component: "shared.text-grid";
//   id: number;
//   items: { title: string; text: string }[];
// }

// Union type bao gồm tất cả các loại block có thể có
// type AnyBlock = Block | ImageTextBlock | TextGridBlock;

interface BlockRendererProps {
  // Sử dụng AnyBlock để có type-safety thay vì `any`
  blocks: Block[];
}

const RichText = ({ body }: { body: string }) => (
  <div className="text-justify">
    <ReactMarkdown>{body}</ReactMarkdown>
  </div>
);

const MediaComponent = ({ file }: { file: Media }) => {
  const imageUrl = getStrapiMedia(file?.url);
  if (!imageUrl) return null;

  return (
    <figure className="my-8 items-center justify-center flex">
      <Image
        src={imageUrl}
        alt={file.alternativeText || "Blog post image"}
        width={file.width}
        height={file.height}
        className="rounded-lg"
      />
      {file.caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {file.caption}
        </figcaption>
      )}
    </figure>
  );
};

const Quote = ({ quote, author }: { quote: string; author?: string }) => {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic my-8">
      <p className="mb-2 text-xl">{`"${quote}"`}</p>
      {author && <cite className="font-semibold not-italic">- {author}</cite>}
    </blockquote>
  );
};

const SliderComponent = ({ files }: { files: Media[] }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {files.map((file) => (
            <CarouselItem key={file.id}>
              <figure className="relative aspect-video">
                <Image
                  src={getStrapiMedia(file.url) || ""}
                  alt={file.alternativeText || "Slider image"}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                {file.caption && (
                  <figcaption className="text-center text-sm text-muted-foreground mt-2">
                    {file.caption}
                  </figcaption>
                )}
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <Fragment>
      {blocks.map((block: Block) => {
        const key = `${block.__component}-${block.id}`;
        switch (block.__component) {
          case "shared.image-text": {
            return <ImageText key={key} {...block as ImageTextProps} />;
          }
          case "shared.text-grid":
            return <TextGrid key={key} data={block.data as TextGridProps["data"]} />;
          case "shared.rich-text":
            return <RichText key={key} body={block.body as string} />;
          case "shared.media":
            return <MediaComponent key={key} file={block.image as Media} />;
          case "shared.quote":
            return <Quote key={key} quote={block.body as string} author={block.title as string | undefined} />;
          case "shared.slider":
            return <SliderComponent key={key} files={block.files as Media[]} />;
            
          default:
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Unknown block component type: ${block.__component}`);
            }
            return null;
        }
      })}
    </Fragment>
  );
}