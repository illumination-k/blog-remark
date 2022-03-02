import { Node } from "unist-util-visit";

export interface CodeNode extends Node {
  lang: string;
  value: string;
}
