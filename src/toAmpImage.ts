import { Parent, visit } from "unist-util-visit";
import { Image } from "mdast";
import sizeOf from "image-size";
import sr from "sync-request";
import createAmpImageNodeWithMeta from "./createAmpImageNode.js";
import { Plugin } from "unified";

type Option = {
  defaultWidth: number;
  defaultHeight: number;
  replacePattern: { pattern: RegExp; to: string } | undefined;
};

type ParseAltResult = {
  meta:
    | {
        grid: string;
        size: number;
      }
    | undefined;
  alt: string;
};

export function parseAlt(alt_str: string): ParseAltResult {
  const alt_arr = alt_str.split(":");
  if (alt_arr.length === 1) {
    return {
      meta: undefined,
      alt: alt_str,
    };
  } else if (alt_arr.length !== 2) {
    throw `Invalit alt format: ${alt_str}`;
  }

  const meta_string = alt_arr[0];
  const alt = alt_arr[1];

  const meta_arr = meta_string.split("=");
  const grid = meta_arr[0];
  let size_str = meta_arr[1];

  if (size_str.startsWith("{") && size_str.endsWith("}")) {
    size_str = size_str.replace(/^{*(.*?)}$/, "$1");
  }

  const size = parseInt(size_str, 10);

  return {
    meta: { grid, size },
    alt,
  };
}

export default function toAmpImage(
  option: Option = {
    defaultHeight: 100,
    defaultWidth: 100,
    replacePattern: undefined,
  }
): Plugin {
  return (ast: Parent) => {
    visit(ast, "image", (node: Image, index: number, parent: Parent) => {
      let url = node.url;
      const alt_str = node.alt || "No alt";
      const { alt, meta } = parseAlt(alt_str);

      if (option.replacePattern) {
        if (option.replacePattern.pattern.test(url)) {
          url = url.replace(
            option.replacePattern.pattern,
            option.replacePattern.to
          );
        }
      }

      const buf = Buffer.from(sr("GET", url).getBody());
      const dimensions = sizeOf(buf);

      const newNode = createAmpImageNodeWithMeta(
        url,
        alt,
        dimensions.width || option.defaultWidth,
        dimensions.height || option.defaultHeight,
        meta
      );

      parent.children[index] = newNode;
    });
  };
}
