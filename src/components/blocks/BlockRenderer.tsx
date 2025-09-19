"use client";

import Image from "next/image";
import React, { Fragment } from "react";
import { getStrapiMedia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Block, Media } from "@/types/strapi/strapi";
import ReactMarkdown from "react-markdown";

interface BlockRendererProps {
  blocks: Block[];
}

const RichText = ({ body }: { body: string }) => (
    // Thêm class `prose` từ Tailwind Typography để định dạng văn bản đẹp hơn
    <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
            components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props} />,
                img: ({ node, ...props }) => <img className="p-4 mx-auto block rounded-lg shadow-lg" {...props} />,
            }}
        >
            {body}
        </ReactMarkdown>
    </div>
);

const MediaComponent = ({ file }: { file: Media }) => {
  const imageUrl = getStrapiMedia(file?.url);
  if (!imageUrl) return null;

  return (
    <figure className="my-8 flex flex-col items-center justify-center">
      <Image
        src={imageUrl}
        alt={file.alternativeText || "Blog post image"}
        width={file.width}
        height={file.height}
        className="rounded-lg shadow-lg"
      />
      {file.caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {file.caption}
        </figcaption>
      )}
    </figure>
  );
};

const Quote = ({ quote, author }: { quote: string; author?: string }) => {
  return (
    <blockquote className="my-8 border-l-4 border-primary bg-muted/20 p-4 italic">
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
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {file.caption}
                  </figcaption>
                )}
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 z-10 -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 z-10 -translate-y-1/2" />
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