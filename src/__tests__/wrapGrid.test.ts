import { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { createAmpImageNode } from "../createAmpImageNode";
import { assertMdxJsxFlowElement } from "../test_utils/assert";
import { wrapGrid } from "../warpGrid";

describe("wrapGrid Test", () => {
  it("basic", () => {
    const children = createAmpImageNode("src", "alt", 100, 100);
    const node = wrapGrid("md", 6, [children]);

    const expected: MdxJsxFlowElement = {
      type: "mdxJsxFlowElement",
      name: "Grid",
      attributes: [
        { type: "mdxJsxAttribute", name: "item" },
        { type: "mdxJsxAttribute", name: "md", value: "6" },
      ],
      children: [
        {
          type: "mdxJsxFlowElement",
          name: "amp-img",
          attributes: [
            { type: "mdxJsxAttribute", name: "src", value: "src" },
            { type: "mdxJsxAttribute", name: "alt", value: "alt" },
            { type: "mdxJsxAttribute", name: "width", value: "100" },
            { type: "mdxJsxAttribute", name: "height", value: "100" },
            { type: "mdxJsxAttribute", name: "layout", value: "responsive" },
          ],
          children: [],
        },
      ],
    };

    assertMdxJsxFlowElement(node, expected);
  });
});
