import { deepEqual, equal, strictEqual } from "assert";
import createAmpImageNodeWithMeta from "../createAmpImageNode";
import { createAmpImageNode } from "../createAmpImageNode";
import { parseAlt } from "../toAmpImage";

describe("Test of createAmpImageNode", () => {
  it("basic", () => {
    const node = createAmpImageNode("src", "alt", 100, 100);
    const expectedNode = {
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
    };

    strictEqual(node.type, expectedNode.type);
    strictEqual(node.name, expectedNode.name);
    deepEqual(node.attributes, expectedNode.attributes);
    deepEqual(node.children, expectedNode.children);
  });

  it("alt parsing", () => {
    const { meta, alt } = parseAlt("md={6}:alt");
    strictEqual(alt, "alt");
    deepEqual(meta, { grid: "md", size: 6 });
  });

  it("alt parsing with wrapgrid", () => {
    const { meta, alt } = parseAlt("md={6}:alt");
    const node = createAmpImageNodeWithMeta("src", alt, 100, 100, meta);
    console.log(node);
  });
});
