"use client";

import { AnyContentBlock } from "@/types/strapi/blocks/content-blocks";
import { AnyDynamicBlock } from "@/types/strapi/blocks/dynamic-blocks";
import { isContentBlock, isSection } from "@/utils/type-guards";
import { useMemo } from "react";
import AboutSection from "../sections/About";
import AdvantagesSection from "../sections/Advantages";
import HeroSection from "../sections/Hero";
import PartnersSection from "../sections/Partners";
import ServicesSection from "../sections/Services";
import ContentContainer from "./ContentContainer";

// Union type for grouped sections
type GroupedSection = { type: "section"; component: AnyDynamicBlock } | { type: "shared"; blocks: AnyContentBlock[] };

interface PageRendererProps {
    sections: AnyDynamicBlock[];
}

export default function PageRenderer({ sections }: PageRendererProps) {
    if (!sections || sections.length === 0) {
        return null;
    }

    const componentsMap = {
        "sections.hero": HeroSection,
        "sections.about": AboutSection,
        "sections.services": ServicesSection,
        "sections.advantages": AdvantagesSection,
        "sections.partners": PartnersSection,
    };

    // Use useMemo to group sections only when the `sections` prop changes.
    const groupedSections = useMemo(() => {
        return sections.reduce<GroupedSection[]>((acc, block) => {
            // Sử dụng type guard cho dữ liệu thô từ Strapi
            console.log(block);
            if (isSection(block)) {
                acc.push({ type: "section", component: block });
            } else if (isContentBlock(block)) {
                const lastElement = acc[acc.length - 1];
                if (lastElement?.type === "shared") {
                    lastElement.blocks.push(block as AnyContentBlock);
                } else {
                    acc.push({ type: "shared", blocks: [block] });
                }
            }
            return acc;
        }, []);
    }, [sections]);

    return (
        <main className="flex-grow">
            {groupedSections.map((group, index) => {
                if (group.type === "section") {
                    const mappedComponent = group.component;
                    if (!mappedComponent) return null;
                    const Component = componentsMap[mappedComponent.__component as keyof typeof componentsMap];
                    const key = `${mappedComponent.__component}-${mappedComponent.id}`;
                    // @ts-ignore - We know the data type matches the component
                    return Component ? <Component key={key} data={mappedComponent} /> : null;
                }

                if (group.type === "shared") {
                    return <ContentContainer key={`content-group-${index}`} blocks={group.blocks} />;
                }

                return null;
            }
            )}
        </main>
    );
}
