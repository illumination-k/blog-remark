import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxjs } from "micromark-extension-mdxjs";
import fs from "node:fs";

const doc = fs.readFileSync("example.mdx");

const tree = fromMarkdown(doc, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown],
});

console.log(tree);

const out = toMarkdown(tree, { extensions: [mdxToMarkdown] });

console.log(out);
