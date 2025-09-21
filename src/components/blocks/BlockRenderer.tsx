"use client";

import Image from "next/image";
import React, { Fragment, JSX } from "react";
import { getStrapiMedia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; 
import { Media } from "@/types/strapi/strapi";
import ReactMarkdown from 'react-markdown';
import { AnySharedBlock, SharedImageBlock, SharedListItemBlock, SharedMediaBlock, SharedRichtextImageBlock, SharedRichtextVideoBlock, SharedVideoBlock } from "@/types/strapi/blocks/shared";
import { Slide } from "@/types/strapi/elements/slide";
import Pretitle from "../elements/Pretitle";
import { motion } from "framer-motion";
import DynamicIcon from "../elements/DynamicIcon";

interface BlockRendererProps {
  blocks: AnySharedBlock[];
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
  const mediaUrl = getStrapiMedia(file?.url);
  if (!mediaUrl) return null;

  const isImage = file.mime.startsWith('image/');
  const isVideo = file.mime.startsWith('video/');

  const caption = (
    file.caption && (
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        {file.caption}
      </figcaption>
    )
  );

  if (isImage) {
    return (
      <figure className="my-8 flex flex-col items-center justify-center">
        <Image
          src={mediaUrl}
          alt={file.alternativeText || "Media content"}
          width={file.width}
          height={file.height}
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
        {caption}
      </figure>
    );
  }

  if (isVideo) {
    return (
      <figure className="my-8 flex flex-col items-center justify-center">
        <video controls src={mediaUrl} className="rounded-lg shadow-lg max-w-full">
          Your browser does not support the video tag.
        </video>
        {caption}
      </figure>
    );
  }

  return (
    <div className="my-8 p-4 border rounded-lg text-center bg-muted/20">
      <a href={mediaUrl} download={file.name} className="text-primary hover:underline font-semibold">
        Download: {file.name}
      </a>
      {caption}
    </div>
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

const SliderComponent = ({ slides }: { slides: Slide[] }) => {
  if (!slides || slides.length === 0) {
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
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <figure className="relative aspect-video">
                <Image
                  src={getStrapiMedia(slide.image.url) || ""}
                  alt={slide.alternativeText || slide.image.alternativeText || "Slider image"}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                {slide.caption && (
                  <figcaption className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm">
                    {slide.caption}
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

const VideoComponent = ({ data }: { data: SharedVideoBlock }) => {
  if (!data.youtubeId) return null;

  return (
    <div className="my-8 aspect-video w-full max-w-4xl mx-auto">
      <iframe
        className="w-full h-full rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${data.youtubeId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};


const ListItem = ({ data }: { data: SharedListItemBlock }): JSX.Element | null => {
    const { pretitle, title, items } = data;

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="my-8">
            {(pretitle || title) && (
                <div className="text-center mb-12">
                    {pretitle && <Pretitle text={pretitle} center={true} />}
                    {title && <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-4">{title}</h2>}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="bg-card p-6 rounded-lg text-center flex flex-col items-center border border-border shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {item.icon && (
                            <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mb-4">
                                <DynamicIcon icon={item.icon} altText={item.title} />
                            </div>
                        )}
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const RichtextImage = ({ data }: { data: SharedRichtextImageBlock }) => {
    const { pretitle, title, content, image } = data;
    const imageUrl = getStrapiMedia(image?.url);

    return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
                {pretitle && <Pretitle text={pretitle} />}
                {title && <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>}
                <RichText body={content} />
            </div>
            <div className="order-1 md:order-2">
                {imageUrl && (
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                        <Image 
                            src={imageUrl} 
                            alt={image.alternativeText || title} 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 768px) 90vw, 45vw"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const RichtextVideo = ({ data }: { data: SharedRichtextVideoBlock }) => {
    const { pretitle, title, content, video } = data;

    return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
                {pretitle && <Pretitle text={pretitle} />}
                {title && <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>}
                <RichText body={content} />
            </div>
            <div className="order-1 md:order-2">
                <VideoComponent data={video} />
            </div>
        </div>
    );
};


export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <Fragment>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;
        switch (block.__component) {
          case "shared.rich-text":
            // block bây giờ có kiểu SharedRichTextBlock
            return <RichText key={key} body={block.body} />;
          case "shared.quote":
            // block bây giờ có kiểu SharedQuoteBlock
            return <Quote key={key} quote={block.quote} author={block.author ?? undefined} />;
          case "shared.slider":
            // block bây giờ có kiểu SharedSliderBlock
            return <SliderComponent key={key} slides={block.slides} />;
          case "shared.list-item":
            return <ListItem key={key} data={block as SharedListItemBlock} />;
          case "shared.video":
            return <VideoComponent key={key} data={block as SharedVideoBlock} />;
          case "shared.image":
            return <MediaComponent key={key} file={(block as SharedImageBlock).image} />;
          case "shared.media":
            return <MediaComponent key={key} file={(block as SharedMediaBlock).file} />;
          case "shared.richtext-image":
            return <RichtextImage key={key} data={block as SharedRichtextImageBlock} />;
          case "shared.richtext-video":
            return <RichtextVideo key={key} data={block as SharedRichtextVideoBlock} />;
          default:
            if (process.env.NODE_ENV === 'development') {
              console.warn(`BlockRenderer: Không tìm thấy component cho block loại "${(block as any).__component}".`);
            }
            return null;
        }
      })}
    </Fragment>
  );
}