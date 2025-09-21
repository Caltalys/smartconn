import { QuoteBlock } from "@/lib/types";

interface QuoteProps {
  data: QuoteBlock;
}

export default function Quote({ data }: QuoteProps) {
  return (
    <blockquote className="my-8 border-l-4 border-gray-400 pl-4 italic">
      <p className="text-xl">"{data.text}"</p>
      <cite className="mt-2 block text-right not-italic">- {data.author}</cite>
    </blockquote>
  );
}