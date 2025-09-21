/**
 * Chuyển đổi cấu trúc Strapi Blocks (JSON tree) thành chuỗi Markdown.
 * Hỗ trợ: paragraph, heading, list (ordered/unordered), và định dạng inline (bold, italic).
 */

// Định nghĩa các kiểu node trong Strapi Blocks
interface RichTextLeaf {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean; // Markdown không hỗ trợ → fallback sang HTML
}

interface ListItemNode {
  type: "list-item";
  children: RichTextLeaf[];
}

interface ParagraphNode {
  type: "paragraph";
  children: RichTextLeaf[];
}

interface HeadingNode {
  type: "heading";
  level: number; // 1-6
  children: RichTextLeaf[];
}

interface ListNode {
  type: "list";
  format: "ordered" | "unordered";
  children: ListItemNode[];
}

type StrapiRichTextNode = ParagraphNode | HeadingNode | ListNode;

/**
 * Định dạng một leaf node (đoạn text) thành chuỗi, có hỗ trợ định dạng inline.
 */
function formatLeaf(leaf: RichTextLeaf): string {
  let text = leaf.text || "";

  if (leaf.bold) {
    text = `**${text}**`;
  }
  if (leaf.italic) {
    text = `*${text}*`;
  }
  if (leaf.underline) {
    // Markdown không có underline → dùng HTML
    text = `<u>${text}</u>`;
  }

  return text;
}

/**
 * Chuyển đổi mảng các node Strapi Blocks thành chuỗi Markdown.
 */
export function blocksToMarkdown(blocks: unknown): string {
  // Kiểm tra an toàn đầu vào
  if (!Array.isArray(blocks)) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[blocksToMarkdown] Input is not an array:", blocks);
    }
    return "";
  }

  return blocks
    .map((block) => {
      if (typeof block !== "object" || block === null) {
        return "";
      }

      switch ((block as any).type) {
        case "paragraph": {
          const paragraph = block as ParagraphNode;
          if (!Array.isArray(paragraph.children)) return "";
          return paragraph.children.map(formatLeaf).join("");
        }

        case "heading": {
          const heading = block as HeadingNode;
          if (!Array.isArray(heading.children)) return "";
          const hashes = "#".repeat(
            Math.max(1, Math.min(6, heading.level || 1))
          );
          return `${hashes} ${heading.children.map(formatLeaf).join("")}`;
        }

        case "list": {
          const list = block as ListNode;
          if (!Array.isArray(list.children)) return "";

          return list.children
            .map((listItem, index) => {
              if (!Array.isArray(listItem.children)) return "";
              const prefix = list.format === "ordered" ? `${index + 1}.` : "*";
              return `${prefix} ${listItem.children.map(formatLeaf).join("")}`;
            })
            .join("\n");
        }

        default:
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[blocksToMarkdown] Unknown block type: ${(block as any).type}`
            );
          }
          return "";
      }
    })
    .filter((str) => str.trim() !== "") // Loại bỏ đoạn trống
    .join("\n\n"); // Ngăn cách các block bằng 2 dòng mới
}
