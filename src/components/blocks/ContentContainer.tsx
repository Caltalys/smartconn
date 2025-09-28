import { AnyContentBlock } from "@/types/strapi/blocks/content-blocks";
import BlockRenderer from "./BlockRenderer";

interface ContentContainerProps {
    blocks: AnyContentBlock[];
}

const ContentContainer = ({ blocks }: ContentContainerProps) => {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 py-8 max-w-4xl">
            <BlockRenderer blocks={blocks} />
        </section>
    );
};

export default ContentContainer;