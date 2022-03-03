import { Parent, visit } from "unist-util-visit";
import { ImageNode } from "./interfaces";
import sizeOf from "image-size";
import sr from "sync-request";
import createAmpImageNode from "./createAmpImageNode";

function createGithubRepoImageNode(
  repo_url: string,
  gh_card_url: string,
  alt: string,
  width: number,
  height: number
) {
  const ampImage = createAmpImageNode(gh_card_url, alt, width, height, "fixed");

  return {
    type: "link",
  };
}

export default function toGithubRepoImage() {
  return (ast: Parent) => {
    visit(ast, "image", (node: ImageNode, index: number, parent: Parent) => {
      const url = node.url;
      const alt = node.alt;
      const position = node.position;

      if (!url.startsWith("github:")) {
        return;
      }

      if (url.split(":").length <= 1) {
        return;
      }

      const repo_name = url.split(":")[1];
      const gh_card_url = `https://gh-card.dev/repos/${repo_name}.svg`;
      const repo_url = `https://github.com/${repo_name}`;

      const res = sr("GET", gh_card_url);
      const buf = Buffer.from(res.getBody());
      const dimensions = sizeOf(buf);

      const newNode = createGithubRepoImageNode(
        repo_url,
        gh_card_url,
        alt,
        dimensions.width || 100,
        dimensions.height || 100
      );

      parent.children[index] = newNode;
    });
  };
}
