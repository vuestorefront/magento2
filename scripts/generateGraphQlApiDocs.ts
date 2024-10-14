import * as fs from "fs";
import * as path from "path";

type ImportedVars = {
  importedVars: string[];
  importPath: string;
};

type QueryResult = {
  queryName: string;
  queryDefinition: string | null;
};

function findGraphQLInContent(content: string): string | null {
  const gqlRegex = /export\s+default\s+gql`([\s\S]*?)`;/g;
  const stringRegex = /export\s+default\s+`([\s\S]*?)`;/g;
  const match = gqlRegex.exec(content) || stringRegex.exec(content);
  return match ? match[1].trim() : null;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else if (filePath.endsWith(".ts")) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

function parseImports(content: string): ImportedVars[] {
  const importRegex = /import\s+{(.+)}\s+from\s+['"](.+)['"]/g;
  let match: RegExpExecArray | null;
  const imports: ImportedVars[] = [];
  while ((match = importRegex.exec(content)) !== null) {
    const importedVars = match[1].split(",").map((item) => item.trim());
    const importPath = match[2].trim();
    imports.push({importedVars, importPath});
  }
  return imports;
}

function findFragmentDefinitionInFolder(folderPath: string): string | null {
  const files = getAllFiles(folderPath);
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const definition = findGraphQLInContent(content);
    if (definition) {
      return definition;
    }
  }
  return null;
}

function resolveImportPath(basePath: string, importPath: string): string {
  let resolvedPath = path.resolve(basePath, importPath);
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    resolvedPath = path.join(resolvedPath, "index.ts");
  } else if (!resolvedPath.endsWith(".ts")) {
    resolvedPath += ".ts";
  }
  return resolvedPath;
}

function resolveImports(filePath: string, imports: ImportedVars[]): Record<string, string> {
  const resolvedQueries: Record<string, string> = {};
  imports.forEach((importStatement) => {
    const importFilePath = resolveImportPath(path.dirname(filePath), importStatement.importPath);
    if (fs.existsSync(importFilePath)) {
      const content = fs.readFileSync(importFilePath, "utf8");
      importStatement.importedVars.forEach((varName) => {
        const queryDefinition = findGraphQLInContent(content);
        if (queryDefinition) {
          resolvedQueries[varName] = queryDefinition;
        }
      });
    }
  });
  return resolvedQueries;
}

function expandFragments(query: string, folderPaths: string[]): string {
  let previousQuery = "";
  let currentQuery = query;
  const fragmentRegex = /\$\{(\w+)\}/g;
  while (previousQuery !== currentQuery) {
    previousQuery = currentQuery;
    let match: RegExpExecArray | null = fragmentRegex.exec(currentQuery);
    while (match !== null) {
      const fragmentName = match[1];
      let fragmentDefinition: string | null = null;
      for (const folderPath of folderPaths) {
        fragmentDefinition = findFragmentDefinitionInFolder(folderPath);
        if (fragmentDefinition) break;
      }
      if (fragmentDefinition) {
        currentQuery = currentQuery.replace(`\${${fragmentName}}`, fragmentDefinition);
      }
      match = fragmentRegex.exec(currentQuery);
    }
  }
  return currentQuery;
}

function findQueriesInFile(filePath: string, fragmentFolderPaths: string[], markdownFile: string): void {
  const content = fs.readFileSync(filePath, "utf8");
  const imports = parseImports(content);
  const resolvedQueries = resolveImports(filePath, imports);
  const queryRegex = /(\w+):\s*{\s*query:\s*(\w+)/g;
  const methodRegex = /async function (\w+)\s*\(/g;
  let methodMatch = methodRegex.exec(content);
  const queryResults: QueryResult[] = [];
  let match: RegExpExecArray | null;

  while ((match = queryRegex.exec(content)) !== null) {
    const queryName = match[1];
    const queryVariable = match[2];
    const queryDefinition =
      resolvedQueries[queryVariable] ||
      findGraphQLInContent(content) ||
      findFragmentDefinitionInFolder(path.dirname(filePath));

    if (methodMatch && methodMatch.index < match.index) {
      fs.appendFileSync(
        markdownFile,
        `### Method: ${methodMatch[1]}\n- Query: ${queryName}\n`
      );
      methodMatch = methodRegex.exec(content); // Move to the next method
    }

    if (queryDefinition) {
      const expandedQuery = expandFragments(queryDefinition, [path.dirname(filePath), ...fragmentFolderPaths]);
      fs.appendFileSync(
        markdownFile,
        `\`\`\`graphql\n${expandedQuery}\n\`\`\`\n\n`
      );
    } else {
      fs.appendFileSync(
        markdownFile,
        `- **GraphQL Query definition not found.**\n\n`
      );
    }
  }
}

function findQueriesInFolder(folderPath: string, fragmentFolderPaths: string[], markdownFile: string): void {
  const files = getAllFiles(folderPath);
  files.forEach((file) => {
    findQueriesInFile(file, fragmentFolderPaths, markdownFile);
  });
}

const apiFolderPath = path.join(__dirname, "../packages/api-client/src/api");
const markdownFile = path.join(__dirname, "../docs/content/4.advanced/graphql-queries.md");

if (fs.existsSync(markdownFile)) {
  fs.unlinkSync(markdownFile);
}

fs.writeFileSync(markdownFile, `# Magento 2 API GraphQL Queries Documentation\n\nThis documentation provides an overview of the GraphQL queries executed by specific methods in the Magento 2 API.\n\n`);

findQueriesInFolder(apiFolderPath, [], markdownFile);

console.log(`Documentation generated in ${markdownFile}`);
