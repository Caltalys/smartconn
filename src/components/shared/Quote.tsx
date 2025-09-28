import { memo } from "react";

const QuoteComponent = ({ pretitle, quote, author }: { pretitle: string, quote: string; author?: string }) => {
    return (
        <blockquote className="my-8 border-l-4 border-primary bg-muted/20 p-4 italic">
            <p className="mb-2 text-xl">{`"${quote}"`}</p>
            {author && <cite className="font-semibold not-italic">- {author}</cite>}
        </blockquote>
    );
};

export default memo(QuoteComponent);