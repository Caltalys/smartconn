import Pretitle from "@/components/elements/Pretitle";
import { RichtextImageBlock } from "@/types/strapi/shared/richtext-image";
import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";
import RichText from "./RichText";

const RichtextImageComponent = ({ data }: { data: RichtextImageBlock }) => {
    const { title, heading, image, layout, body } = data;

    // Xác định các lớp CSS order dựa trên giá trị layout
    const textOrderClass = layout === "image-left" ? "md:order-2" : "md:order-1";
    const imageOrderClass = layout === "image-left" ? "md:order-1" : "md:order-2";

    return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Khối văn bản */}
            <div className={clsx("order-2", textOrderClass)}>
                {title && <Pretitle text={title} />}
                {heading && <h2 className="text-2xl sm:text-3xl font-bold mb-4">{heading}</h2>}
                <RichText data={body} />
            </div>
            {/* Khối hình ảnh */}
            <div className={clsx("order-1", imageOrderClass)}>
                {image?.url && (
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={image.url}
                            alt={image.alt || title}
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