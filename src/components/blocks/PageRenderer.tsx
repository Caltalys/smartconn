"use client";

import { AnyContentBlock } from "@/types/strapi/blocks/content-blocks";
import {
    isAboutSection,
    isAdvantagesSection,
    isContentBlock,
    isHeroSection,
    isPartnersSection,
    isServicesSection,
} from "@/utils/type-guards";
import { useMemo } from "react";
import AboutSection from "../sections/About";
import AdvantagesSection from "../sections/Advantages";
import HeroSection from "../sections/Hero";
import PartnersSection from "../sections/Partners";
import ServicesSection from "../sections/Services";
import ContentContainer from "./ContentContainer";

// Union type for grouped sections
type GroupedSection = { type: "section"; component: AnyContentBlock } | { type: "content"; blocks: AnyContentBlock[] };

interface PageRendererProps {
    sections: AnyContentBlock[];
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
        return sections.reduce<GroupedSection[]>((acc, section) => {
            const isFullWidthSection = isHeroSection(section) || isAboutSection(section) || isServicesSection(section) || isAdvantagesSection(section) || isPartnersSection(section);

            if (isFullWidthSection) {
                acc.push({ type: "section", component: section });
            } else if (isContentBlock(section)) {
                const lastElement = acc[acc.length - 1];
                if (lastElement?.type === "content") {
                    lastElement.blocks.push(section);
                } else {
                    acc.push({ type: "content", blocks: [section] });
                }
            }
            return acc;
        }, []);
    }, [sections]);

    return (
        <main className="flex-grow">
            {groupedSections.map((group, index) => {
                if (group.type === "section") {
                    const Component = componentsMap[group.component.__component as keyof typeof componentsMap];
                    const key = `${group.component.__component}-${group.component.id}`;
                    // @ts-ignore - We know the data type matches the component
                    return Component ? <Component key={key} data={group.component} /> : null;
                }

                if (group.type === "content") {
                    return <ContentContainer key={`content-group-${index}`} blocks={group.blocks} />;
                }

                return null;
            }
            )}
        </main>
    );
}
