import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia } from "@/types/strapi/strapi";
import Image from "next/image";
import { JSX, memo } from "react";
import { RiFileDownloadLine } from "react-icons/ri";

const MediaComponent = ({ file }: { file: BaseMedia | null }): JSX.Element | null => {
    // 1. Kiểm tra an toàn cho prop `file`
    if (!file) return null;

    const mediaUrl = getStrapiMedia(file?.url);
    if (!mediaUrl) return null;

    const isImage = file.mime.startsWith('image/');
    const isVideo = file.mime.startsWith('video/');

    // 2. Tách component Caption để tái sử dụng
    const Caption = file.caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {file.caption}
        </figcaption>
    ) : null;

    if (isImage) {
        return (
            <figure className="my-8 flex flex-col items-center justify-center">
                {/* 3. Tối ưu hóa Image với `fill` và `sizes` */}
                <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={mediaUrl}
                        alt={file.alternativeText || "Media content"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                    />
                </div>
                {Caption}
            </figure>
        );
    }

    if (isVideo) {
        return (
            // 4. Cải thiện UX cho video
            <figure className="my-8 flex flex-col items-center justify-center">
                <video
                    controls
                    src={mediaUrl}
                    poster={getStrapiMedia(file.formats?.thumbnail?.url || file.url) ?? undefined} // Chuyển đổi null thành undefined
                    className="rounded-lg shadow-lg max-w-full"
                    playsInline // Cải thiện trải nghiệm trên iOS
                    muted // Cho phép autoplay trên một số trình duyệt
                >
                    Your browser does not support the video tag.
                </video>
                {Caption}
            </figure>
        );
    }

    // 5. Cải thiện UI cho các loại file khác
    return (
        <div className="my-8 p-6 border rounded-lg text-center bg-muted/20 flex flex-col items-center gap-2">
            <RiFileDownloadLine className="w-8 h-8 text-muted-foreground" />
            <a href={mediaUrl} download={file.name} className="text-primary hover:underline font-semibold break-all">
                {file.name}
            </a>
            {Caption}
        </div>
    );
};

export default memo(MediaComponent);