import Image from "next/image";
import { memo } from "react";
import ReactMarkdown from 'react-markdown';

const RichTextComponent = ({ data }: { data: string }) => (
    // Thêm class `prose` từ Tailwind Typography để định dạng văn bản đẹp hơn
    <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
            components={{
                p: ({ ...props }) => <p className="mb-4" {...props} />,
                h2: ({ ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({ ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                a: ({ ...props }) => <a target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props} />,
                img: ({ src, alt }) => {
                    const imageSrc = typeof src === 'string' ? src : '';

                    return (
                        <span className="block my-8">
                            <span className="relative block mx-auto aspect-video max-w-3xl">
                                <Image
                                    src={imageSrc}
                                    alt={alt || "Image from content"}
                                    fill
                                    className="rounded-lg shadow-lg object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                />
                            </span>
                        </span>
                    );
                },
            }}
        >
            {data}
        </ReactMarkdown>
    </div>
);

export default memo(RichTextComponent);