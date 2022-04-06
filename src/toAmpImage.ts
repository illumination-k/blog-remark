import { Parent, visit } from "unist-util-visit";
import { Image } from "mdast";
import sizeOf from "image-size";
import sr from "sync-request";
import createAmpImageNode from "./createAmpImageNode.js";
import { Plugin } from "unified";

type Option = {
  defaultWidth: number;
  defaultHeight: number;
  replacePattern: { pattern: RegExp; to: string } | undefined;
};

export default function toAmpImage(
  option: Option = {
    defaultHeight: 100,
    defaultWidth: 100,
    replacePattern: undefined,
  }
): Plugin {
  return (ast: Parent) => {
    visit(ast, "image", (node: Image, index: number, parent: Parent) => {
      let url = node.url;
      const alt = node.alt || "No alt";

      if (option.replacePattern) {
        if (option.replacePattern.pattern.test(url)) {
          url = url.replace(
            option.replacePattern.pattern,
            option.replacePattern.to
          );
        }
      }

      const buf = Buffer.from(sr("GET", url).getBody());
      const dimensions = sizeOf(buf);

      const newNode = createAmpImageNode(
        url,
        alt,
        dimensions.width || option.defaultWidth,
        dimensions.height || option.defaultHeight
      );

      parent.children[index] = newNode;
    });
  };
}
