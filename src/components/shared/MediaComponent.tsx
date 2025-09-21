import { getStrapiMedia } from "@/lib/utils";
import { StrapiMedia } from "@/types/strapi/strapi";
import Image from "next/image";
import { memo } from "react";

const MediaComponent = ({ file }: { file: StrapiMedia }) => {
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

export default memo(MediaComponent);