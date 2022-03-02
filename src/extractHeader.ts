import { Heading as AstHeading } from "mdast";
import { Node } from "unist";
import { toString } from "mdast-util-to-string";
import { VFileWithOutput } from "unified";
import { visit } from "unist-util-visit";

type Heading = {
  depth: number;
  value: string;
};

export function headings(ast: Node) {
  const headingsList: Heading[] = [];

  visit(ast, "heading", (node: AstHeading) => {
    headingsList.push({
      depth: node.depth,
      value: toString(node, { includeImageAlt: false }),
    });
  });

  return headingsList;
}

export default function extractHeadings() {
  return (node: Node, file: VFileWithOutput<any>) => {
    file.data.headings = headings(node);
  };
}
