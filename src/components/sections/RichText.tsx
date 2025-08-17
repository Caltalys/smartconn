'use client';

import ReactMarkdown from "react-markdown";

const RichText = ({ body }: { body: string } ) => (
  <div className="prose prose-lg max-w-none text-justify mx-auto py-8 px-6">
    <ReactMarkdown>{body}</ReactMarkdown>
  </div>
);

export default RichText;

