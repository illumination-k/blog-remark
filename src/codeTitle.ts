import { Parent, visit } from "unist-util-visit";
import { Code } from "mdast";
import { Plugin } from "unified";

export default function codeTitle(): Plugin {
  return transformer;

  function transformer(ast: Parent) {
    const prefix = ":title=";
    visit(ast, "code", (node: Code, index: number) => {
      const lang = node.lang || "";

      const separatorIndex = lang.lastIndexOf(prefix);
      let newLang = lang;

      if (separatorIndex !== -1) {
        newLang = lang.slice(0, separatorIndex);
        const title = lang.slice(separatorIndex + prefix.length);

        const titleNodeclassName = "code-title";

        const titleNode = {
          type: "html",
          value: `
              <div class="${titleNodeclassName}"><span>${title}</span></div>
            `.trim(),
        };

        ast.children.splice(index, 0, titleNode);
      }

      node.lang = newLang;
    });
  }
}
