import ts from "typescript"
import path from "node:path"

const filePath = path.resolve("src/index.ts")

const sourceCode = ts.sys.readFile(filePath);
if (!sourceCode) {
    throw new Error("Não foi possível encontrar o arquivo!")
}

const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.ES2020,
    true
)

function printNodes(node: ts.Node, indent = 0) {
    const padding = " ".repeat(indent);
    console.log(padding + ts.SyntaxKind[node.kind]);

    node.forEachChild((child) => printNodes(child, indent +2))
}

printNodes(sourceFile)