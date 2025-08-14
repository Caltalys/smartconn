"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/lib/utils";
import { Block } from "@/lib/types";

interface BlockRendererProps {
  blocks: Block[];
}

const components: { [key: string]: React.FC<any> } = {
  "shared.rich-text": ({ body }) => (
    <div className="prose-p:text-justify">
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  ),
  "shared.media": ({ file }) => {
    const media = file; // With Strapi v5, 'file' is the flattened media object.
    const imageUrl = getStrapiMedia(media?.url);
    if (!imageUrl) return null;

    return (
      <figure className="my-8">
        <Image
          src={imageUrl}
          alt={media.alternativeText || "Blog post image"}
          width={media.width}
          height={media.height}
          className="rounded-lg"
        />
        {media.caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {media.caption}
          </figcaption>
        )}
      </figure>
    );
  },
  "shared.quote": ({ quote, author }) => {
    return (
      <blockquote className="border-l-4 border-primary pl-4 italic my-8">
        <p className="mb-2 text-xl">"{quote}"</p>
        {author && <cite className="font-semibold not-italic">- {author}</cite>}
      </blockquote>
    );
  },
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const Component = components[block.__component];
        return Component ? <Component key={`${block.__component}-${block.id}`} {...block} /> : null;
      })}
    </>
  );
}