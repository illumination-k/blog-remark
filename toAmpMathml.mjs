import { visit } from "unist-util-visit";

export default toMathml;

function createNewNode(type, val) {
    console.log(type, val);
    return {
        type: type,
        name: "amp-mathml",
        attributes: [
            {
                type: "mdxJsxAttribute",
                name: "data-formula",
                value: `[${val}]`,
            },
        ],
    };
}

function toMathml(options) {
    const type = options.type || "mdxJsxTextElement";
    return transformer;

    function transformer(ast) {
        visit(ast, "math", mathVisitor);
        function mathVisitor(node, index, parent) {
            const newNode = createNewNode(type, node.value);
            parent.children[index] = newNode;
        }

        visit(ast, "inlineMath", inlineMathVistor);
        function inlineMathVistor(node, index, parent) {
            const newNode = createNewNode(type, node.value);
            parent.children[index] = newNode;
        }
    }
}
