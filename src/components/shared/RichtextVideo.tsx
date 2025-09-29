import Pretitle from "@/components/elements/Pretitle";
import { RichtextVideoBlock } from "@/types/strapi/shared/richtext-video";
import clsx from "clsx";
import { memo } from "react";
import RichText from "./RichText";
import VideoComponent from "./VideoComponent";

const RichtextVideoComponent = ({ data }: { data: RichtextVideoBlock }) => {
    const { title, heading, body, video, layout } = data;

    // Xác định các lớp CSS order dựa trên giá trị layout
    const textOrderClass = layout === "video-left" ? "md:order-2" : "md:order-1";
    const videoOrderClass = layout === "video-left" ? "md:order-1" : "md:order-2";

    return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Khối văn bản */}
            <div className={clsx("order-2", textOrderClass)}>
                {title && <Pretitle text={title} />}
                {heading && <h2 className="text-2xl sm:text-3xl font-bold mb-4">{heading}</h2>}
                <RichText data={body} />
            </div>
            {/* Khối Video */}
            <div className={clsx("order-1", videoOrderClass)}>
                <VideoComponent data={video} />
            </div>
        </div>
    );
};

export default memo(RichtextVideoComponent);