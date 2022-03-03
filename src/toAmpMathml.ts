import { Node } from "unist";
import { Parent, visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { MdxJsxAttribute } from "mdast-util-mdx-jsx";

function createNewNode(
  type: "mdxJsxTextElement" | "mdxJsxFlowElement",
  dataFormula: string
) {
  let attributes: MdxJsxAttribute[] = [
    {
      type: "mdxJsxAttribute",
      name: "data-formula",
      value: dataFormula,
    },
    {
      type: "mdxJsxAttribute",
      name: "layout",
      value: "container",
    },
  ];

  if (type == "mdxJsxTextElement") {
    attributes.push({
      type: "mdxJsxAttribute",
      name: "inline",
    });
  }

  return {
    type: type,
    name: "amp-mathml",
    attributes,
  };
}

export default function toAmpMathml() {
  return (ast: Node) => {
    visit(ast, "math", (node: Node, index: number, parent: Parent) => {
      const newNode = createNewNode("mdxJsxFlowElement", toString(node));
      parent.children[index] = newNode;
    });

    visit(ast, "inline-math", (node: Node, index: number, parent: Parent) => {
      const newNode = createNewNode("mdxJsxTextElement", toString(node));
      parent.children[index] = newNode;
    });
  };
}
