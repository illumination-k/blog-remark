import print from "../test_utils/print";
import parser from "remark-parse";
import mdx from "remark-mdx";
import { unified } from "unified";
import stringify from "remark-stringify";
import toGithubRepoImage, {
  createGithubRepoImageNode,
} from "../toGithubRepoImage";
import { createAmpImageNode } from "../createAmpImageNode";
import { assertMdxJsxFlowElement } from "../test_utils/assert";
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

describe("Test of toAmpMathml", () => {
  it("basic", () => {
    const text = "![alt](github:illumination-k/blog)";
    const processor = unified()
      .use(stringify)
      .use(parser)
      .use(mdx)
      .use(toGithubRepoImage);

    processor.processSync(text).toString();
    const html = `<a href="abc">text</a>`;
    //@ts-ignore
    console.log(processor.parse(html).children[0].children[0]);
  });
});

describe("Test of createGithubRepoImage", () => {
  it("basic", () => {
    const node = createGithubRepoImageNode(
      "repourl",
      "ghcard_url",
      "alt",
      100,
      100
    );

    const expected: MdxJsxFlowElement = {
      type: "mdxJsxFlowElement",
      name: "a",
      attributes: [{ type: "mdxJsxAttribute", name: "href", value: "repourl" }],
      children: [createAmpImageNode("ghcard_url", "alt", 100, 100)],
    };

    assertMdxJsxFlowElement(node, expected);
  });
});
