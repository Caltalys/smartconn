"use client";

import { AnyContentBlock } from "@/types/strapi/blocks/content-blocks";
import { isAboutSection, isAdvantagesSection, isHeroSection, isImageBlock, isMediaBlock, isPartnersSection, isQuoteBlock, isRichTextBlock, isRichtextImageBlock, isRichtextVideoBlock, isServicesSection, isSliderBlock, isVideoBlock } from "@/utils/type-guards";
import { JSX } from "react";
import About from "../sections/About";
import Advantages from "../sections/Advantages";
import Hero from "../sections/Hero";
import Partners from "../sections/Partners";
import Services from "../sections/Services";
import BlockRenderer from "./BlockRenderer";

interface PageRendererProps {
    sections: AnyContentBlock[];
}

export default function PageRenderer({ sections }: PageRendererProps) {
    if (!sections || sections.length === 0) {
        return null;
    }

    const content: JSX.Element[] = [];
    let sharedBlocksBuffer: AnyContentBlock[] = [];

    const flushSharedBlocks = (key: string | number) => {
        if (sharedBlocksBuffer.length > 0) {
            content.push(
                <section key={`shared-group-${key}`} className="container mx-auto px-4 py-8 max-w-4xl">
                    <BlockRenderer blocks={sharedBlocksBuffer} />
                </section>
            );
            sharedBlocksBuffer = [];
        }
    };

    sections.forEach((section, index) => {
        const key = `${section.__component}-${section.id}`;

        // --- Xử lý Section ---
        if (isHeroSection(section)) {
            flushSharedBlocks(index);
            content.push(<Hero key={key} data={section} />);
        } else if (isAboutSection(section)) {
            flushSharedBlocks(index);
            content.push(<About key={key} data={section} />);
        } else if (isServicesSection(section)) {
            flushSharedBlocks(index);
            content.push(<Services key={key} data={section} />);
        } else if (isAdvantagesSection(section)) {
            flushSharedBlocks(index);
            content.push(<Advantages key={key} data={section} />);
        } else if (isPartnersSection(section)) {
            flushSharedBlocks(index);
            content.push(<Partners key={key} data={section} />);
        }
        // --- Xử lý Shared Block ---
        else if (
            isQuoteBlock(section) ||
            isRichTextBlock(section) ||
            isImageBlock(section) ||
            isSliderBlock(section) ||
            isVideoBlock(section) ||
            isMediaBlock(section) ||
            isRichtextImageBlock(section) ||
            isRichtextVideoBlock(section)
        ) {
            sharedBlocksBuffer.push(section);
        }
        // --- Xử lý Unknown Block ---
        else {
            if (process.env.NODE_ENV === "development") {
                console.warn(`PageRenderer: Unknown section/block type "${section.__component}"`);
            }
        }
    });

    // Xả nốt buffer ở cuối
    flushSharedBlocks("last");

    return <>{content}</>;
}
