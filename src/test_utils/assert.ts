import { deepEqual, strictEqual } from "assert";
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

export function assertMdxJsxFlowElement(
  received: MdxJsxFlowElement,
  expected: MdxJsxFlowElement
) {
  strictEqual(received.type, expected.type);
  strictEqual(received.name, expected.name);
  deepEqual(received.attributes, expected.attributes);
  strictEqual(received.children.length, expected.children.length);

  // TODO: recursive check of children, but no knowledge about type guard...
  //   for (let i = 0; i < received.children.length; i++) {
  //     assertMdxJsxFlowElement(received.children[i], expected.children[i]);
  //   }
}
