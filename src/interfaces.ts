import { Node } from "unist-util-visit";

export interface CodeNode extends Node {
  lang: string;
  value: string;
}

export interface ImageNode extends Node {
  url: string;
  alt: string;
}
