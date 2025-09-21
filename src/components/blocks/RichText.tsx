import { RichTextBlock } from "@/lib/types";
import {- `markdown-to-jsx` để render an toàn} from "markdown-to-jsx";

interface RichTextProps {
  data: RichTextBlock;
}

export default function RichText({ data }: RichTextProps) {
  return (
    <div className="prose lg:prose-xl max-w-none my-8">
      <Markdown>{data.content}</Markdown>
    </div>
  );
}