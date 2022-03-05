import toAmpMathml from "../toAmpMathml";
import print from "../test_utils/print";
import parser from "remark-parse";
import mdx from "remark-mdx";
import { unified } from "unified";
import stringify from "remark-stringify";
import remarkMath from "remark-math";

describe("Test of toAmpMathml", () => {
  it("basic", () => {
    const math = "$$\na\n$$";
    const processor = unified()
      .use(parser)
      .use(mdx)
      .use(remarkMath)
      .use(toAmpMathml)
      .use(print)
      .use(stringify);

    console.log(processor.processSync(math).toString());
  });
});
