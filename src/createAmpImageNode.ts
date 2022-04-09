import { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { wrapGrid } from "./warpGrid";

export default function createAmpImageNodeWithMeta(
  src: string,
  alt: string,
  width: number,
  height: number,
  meta: undefined | { grid: string; size: number } = undefined,
  layout: string = "responsive"
): MdxJsxFlowElement {
  const ampImgNode = createAmpImageNode(src, alt, width, height, layout);
  let newNode;
  if (meta) {
    const { grid, size } = meta;
    newNode = wrapGrid(grid, size, [ampImgNode]);
  } else {
    newNode = ampImgNode;
  }

  return newNode;
}

export function createAmpImageNode(
  src: string,
  alt: string,
  width: number,
  height: number,
  layout: string = "responsive"
): MdxJsxFlowElement {
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
    children: [],
  };
}
