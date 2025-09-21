import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { getStrapiMedia } from "@/lib/utils";
import { Slide } from "@/types/strapi/elements/slide";
import Image from "next/image";
import { memo } from "react";

const SliderComponent = ({ slides }: { slides: Slide[] }) => {
    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div className="my-8">
            <Carousel
                opts={{
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id}>
                            <figure className="relative aspect-video">
                                <Image
                                    src={getStrapiMedia(slide.image.url) || ""}
                                    alt={slide.alternativeText || slide.image.alternativeText || "Slider image"}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                                {slide.caption && (
                                    <figcaption className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm">
                                        {slide.caption}
                                    </figcaption>
                                )}
                            </figure>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 z-10 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 z-10 -translate-y-1/2" />
            </Carousel>
        </div>
    );
};

export default memo(SliderComponent);