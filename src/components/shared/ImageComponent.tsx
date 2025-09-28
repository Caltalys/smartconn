import { ImageBlock } from "@/types/strapi/shared/image";
import Image from "next/image";
import { JSX, memo } from "react";

const ImageComponent = ({ data }: { data: ImageBlock }): JSX.Element | null => {
    if (!data?.image?.url) {
        return null;
    }

    const { image, alternativeText, layout } = data;

    return (
        <figure className="my-8 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                    src={image.url}
                    alt={image.alternativeText || "Image content"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                />
            </div>
            {alternativeText && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{alternativeText}</figcaption>}
        </figure>
    );
};

export default memo(ImageComponent);