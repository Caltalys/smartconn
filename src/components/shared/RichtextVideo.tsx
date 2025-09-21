import Pretitle from "@/components/elements/Pretitle";
import { SharedRichtextVideoBlock } from "@/types/strapi/blocks/shared";
import { memo } from "react";
import RichText from "./RichText";
import VideoComponent from "./VideoComponent";

const RichtextVideoComponent = ({ data }: { data: SharedRichtextVideoBlock }) => {
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

export default memo(RichtextVideoComponent);