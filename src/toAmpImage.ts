import { Parent, visit } from "unist-util-visit";
import { ImageNode } from "./interfaces";
import sizeOf from "image-size";
import sr from "sync-request";
import createAmpImageNode from "./createAmpImageNode";

export default function toAmpImage() {
  return (ast: Parent) => {
    visit(ast, "image", (node: ImageNode, index: number, parent: Parent) => {
      const url = node.url;
      const alt = node.alt;

      const buf = Buffer.from(sr("GET", url).getBody());
      const dimensions = sizeOf(buf);

      const newNode = createAmpImageNode(
        url,
        alt,
        dimensions.width || 100,
        dimensions.height || 100
      );

      parent.children[index] = newNode;
    });
  };
}
