'use client';

import useEmblaCarousel from 'embla-carousel-react';
import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { SliderBlock } from './types';

interface SliderProps {
  data: SliderBlock;
}

export default function Slider({ data }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => { emblaApi.off('select', onSelect).off('reInit', onSelect); };
  }, [emblaApi, onSelect]);

  if (!data.slides || data.slides.length === 0) {
    return null;
  }

  return (
    <div className="embla my-8 relative group">
      <div className="embla__viewport overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="embla__container flex">
          {data.slides.map((slide) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 relative aspect-video" key={slide.id}>
              <NextImage
                src={slide.image.data.attributes.url}
                alt={slide.image.data.attributes.alternativeText || slide.title || 'Slider Image'}
                fill
                className="object-cover"
              />
              {(slide.title || slide.caption) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  {slide.title && <h3 className="text-xl font-bold">{slide.title}</h3>}
                  {slide.caption && <p className="text-sm mt-1">{slide.caption}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="embla__prev absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100" onClick={scrollPrev}>
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button className="embla__next absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100" onClick={scrollNext}>
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="embla__dots absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`embla__dot w-3 h-3 rounded-full transition-colors ${index === selectedIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}