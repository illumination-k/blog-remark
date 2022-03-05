import print from "../test_utils/print";
import parser from "remark-parse";
import mdx from "remark-mdx";
import { unified } from "unified";
import stringify from "remark-stringify";
import toGithubRepoImage from "../toGithubRepoImage";

describe("Test of toAmpMathml", () => {
  it("basic", () => {
    const text = "![alt](github:illumination-k/blog)";
    const processor = unified().use(parser).use(mdx).use(toGithubRepoImage);

    processor.processSync(text).toString();
    const html = `<a href="abc">text</a>`;
    //@ts-ignore
    console.log(processor.parse(html).children[0].children[0]);
  });
});
