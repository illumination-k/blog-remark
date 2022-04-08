import { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";

export function wrapGrid(
  grid: string,
  size: number,
  children: MdxJsxFlowElement[]
): MdxJsxFlowElement {
  const attributes: MdxJsxAttribute[] = [
    {
      type: "mdxJsxAttribute",
      name: grid,
      value: size.toString(),
    },
  ];

  return {
    type: "mdxJsxFlowElement",
    name: "Grid",
    attributes,
    children,
  };
}
