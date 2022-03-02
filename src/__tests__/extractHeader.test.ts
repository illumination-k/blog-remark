import headings from "../extractHeader";

import parser from "remark-parse";
import mdx from "remark-mdx";
import { unified } from "unified";
import stringify from "remark-stringify";

const exports = {};

describe("Test of toAmpMathml", () => {
  it("basic", () => {
    const doc = "# Title\n## A\n ### B\n";
    const processor = unified()
      .use(parser)
      .use(mdx)
      .use(stringify)
      .use(headings);

    const expected = [
      { depth: 1, value: "Title" },
      { depth: 2, value: "A" },
      { depth: 3, value: "B" },
    ];

    expect(expected).toStrictEqual(processor.processSync(doc).data.headings);
  });
});
