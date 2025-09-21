import Pretitle from "@/components/elements/Pretitle";
import { getStrapiMedia } from "@/lib/utils";
import { SharedRichtextImageBlock } from "@/types/strapi/blocks/shared";
import Image from "next/image";
import { memo } from "react";
import RichText from "./RichText";

const RichtextImageComponent = ({ data }: { data: SharedRichtextImageBlock }) => {
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

export default memo(RichtextImageComponent);