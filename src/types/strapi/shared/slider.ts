import { mapSlide, Slide, StrapiSlide } from "../elements/slide";

// Raw Strapi Type
export interface StrapiSliderBlock {
  __component: "shared.slider";
  id: number;
  slides: StrapiSlide[];
}

// Mapped Frontend Type
export interface SliderBlock {
  __component: "shared.slider";
  id: number;
  slides: Slide[];
}

export function mapSliderBlock(block: StrapiSliderBlock): SliderBlock {
  return {
    __component: block.__component,
    id: block.id,
    slides: (block.slides ?? []).map(mapSlide),
  };
}
