import print from "../utils/print";
import parser from "remark-parse";
import mdx from "remark-mdx";
import { unified } from "unified";
import stringify from "remark-stringify";

describe("Test of toAmpMathml", () => {
  it("basic", () => {
    const math = "[text](url)";
    const processor = unified().use(parser).use(mdx).use(print).use(stringify);

    console.log(processor.processSync(math).toString());
  });
});
