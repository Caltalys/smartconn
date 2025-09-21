import { ImageBlock } from "@/lib/types";
import NextImage from "next/image";

interface ImageProps {
  data: ImageBlock;
}

export default function Image({ data }: ImageProps) {
  const { url, alternativeText, width, height } = data.image.data.attributes;

  return (
    <figure className="my-8">
      <NextImage src={url} alt={alternativeText || ""} width={width} height={height} className="rounded-lg" />
      {data.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
}