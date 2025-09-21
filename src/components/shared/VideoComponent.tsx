import { SharedVideoBlock } from "@/types/strapi/blocks/shared";
import { memo } from "react";

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

export default memo(VideoComponent);