import { mapSlide, Slide, StrapiSlide } from "../elements/slide";
import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiSliderBlock extends StrapiComponent {
  __component: "shared.slider";
  slides: StrapiSlide[];
}

// Mapped Frontend Type
export interface SliderBlock extends StrapiComponent {
  slides: Slide[];
}

export function mapSliderBlock(block: StrapiSliderBlock): SliderBlock {
  return {
    ...block,
    slides: (block.slides ?? []).map(mapSlide),
  };
}
