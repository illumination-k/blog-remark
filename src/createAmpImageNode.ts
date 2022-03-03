import { MdxJsxAttribute } from "mdast-util-mdx-jsx";

export default function createAmpImageNode(
  src: string,
  alt: string,
  width: number,
  height: number,
  layout: string = "responsive"
) {
  const attributes: MdxJsxAttribute[] = [
    {
      type: "mdxJsxAttribute",
      name: "src",
      value: src,
    },
    {
      type: "mdxJsxAttribute",
      name: "alt",
      value: alt,
    },
    {
      type: "mdxJsxAttribute",
      name: "width",
      value: width.toString(),
    },
    {
      type: "mdxJsxAttribute",
      name: "height",
      value: height.toString(),
    },
    {
      type: "mdxJsxAttribute",
      name: "layout",
      value: layout,
    },
  ];

  return {
    type: "mdxJsxFlowElement",
    name: "amp-img",
    attributes,
  };
}
