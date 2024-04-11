// This file contains functions that modify files in such a way that add a new SDK method

const fsPromises = require("fs/promises");
const path = require("path");
const handlebars = require("handlebars");
const utils = require("./utils");

/**
 * Creates 'src/methods/methodName/index.ts' with partially filled out content
 * It uses a Handlebars template (JS template string was too painful)
 * @see File ./handlebars-templates/method-implementation.handlebars
 *
 * @param {string} methodsDirectoryPath Folder where the method folders are (src/methods)
 * @param {string} methodName Name of the method to create
 */
module.exports.createMethodImplementationFile = async (methodsDirectoryPath, methodName) => {
  console.info("Creating method folder");
  const methodFolderPath = path.join(methodsDirectoryPath, methodName);

  await fsPromises.mkdir(methodFolderPath);

  const template = handlebars.compile(
    await fsPromises.readFile(path.join(__dirname, "handlebars-templates", "method-implementation-file.handlebars"), { encoding: "utf8" })
  );

  const contents = template({
    camelCaseMethodName: methodName,
    kebabCaseMethodName: utils.kebabize(methodName),
    capitalizedMethodName: utils.capitalize(methodName),
  });

  console.info("Creating method implementation file");
  await fsPromises.writeFile(path.join(methodFolderPath, "index.ts"), contents);
};

/**
 * Appends the string `export { methodName } from './methodName'` to `src/methods/index.ts`
 * @param {string} methodsDirectoryPath Folder where the method folders are (src/methods)
 * @param {string} methodName
 */
module.exports.patchMethodIndexFile = async (methodsDirectoryPath, methodName) => {
  console.info("Adding method export to methods index.ts");
  await fsPromises.appendFile(path.join(methodsDirectoryPath, "index.ts"), `export { ${methodName} } from './${methodName}';`);
};

/**
 * Creates '__tests__/integration/methodName.integration.spec.ts' with partially filled out content
 * It uses a Handlebars template (JS template string was too painful)
 * @see File ./handlebars-templates/method-integration-test-file.handlebars
 *
 * @param {string} integrationTestDirectoryPath Folder where the method folders are (src/methods)
 * @param {string} methodName
 */
module.exports.createMethodIntegrationTestFile = async (integrationTestDirectoryPath, methodName) => {
  const template = handlebars.compile(
    await fsPromises.readFile(path.join(__dirname, "handlebars-templates", "method-integration-test-file.handlebars"), { encoding: "utf8" })
  );

  const contents = template({
    camelCaseMethodName: methodName,
    kebabCaseMethodName: utils.kebabize(methodName),
    capitalizedMethodName: utils.capitalize(methodName),
  });

  console.info("Creating method integration test file");
  await fsPromises.writeFile(path.join(integrationTestDirectoryPath, `${methodName}.integration.spec.ts`), contents);
};

/**
 * Creates '__tests__/unit/methodName.unit.spec.ts' with partially filled out content
 * It uses a Handlebars template (JS template string was too painful)
 * @see File ./handlebars-templates/method-unit-test-file.handlebars
 *
 * @param {string} unitTestDirectoryPath Folder where the method folders are (src/methods)
 * @param {string} methodName
 */
module.exports.createMethodUnitTestFile = async (unitTestDirectoryPath, methodName) => {
  const template = handlebars.compile(
    await fsPromises.readFile(path.join(__dirname, "handlebars-templates", "method-unit-test-file.handlebars"), { encoding: "utf8" })
  );

  const contents = template({
    camelCaseMethodName: methodName,
    kebabCaseMethodName: utils.kebabize(methodName),
    capitalizedMethodName: utils.capitalize(methodName),
  });

  console.info("Creating method unit test file");
  await fsPromises.writeFile(path.join(unitTestDirectoryPath, `${methodName}.unit.spec.ts`), contents);
};

/**
 * Creates '__tests__/integration/__config__/customQueries/methodName/index.ts' with partially filled out content
 * It uses a Handlebars template (JS template string was too painful)
 * @see File ./handlebars-templates/method-custom-query.handlebars
 *
 * @param {string} customQueriesDirectoryPath Folder where the customQueries for methods' integration tests are (__config__/customQueries)
 * @param {string} methodName
 */
module.exports.createMethodCustomQueryFile = async (customQueriesDirectoryPath, methodName) => {
  const newCustomQueryFolderPath = path.join(customQueriesDirectoryPath, methodName);

  await fsPromises.mkdir(newCustomQueryFolderPath);

  const template = handlebars.compile(
    await fsPromises.readFile(path.join(__dirname, "handlebars-templates", "method-custom-query-file.handlebars"), { encoding: "utf8" })
  );

  const contents = template({
    camelCaseMethodName: methodName,
    kebabCaseMethodName: utils.kebabize(methodName),
    capitalizedMethodName: utils.capitalize(methodName),
  });

  console.info("Creating method custom query file");
  await fsPromises.writeFile(path.join(newCustomQueryFolderPath, "index.ts"), contents);
};

/**
 * Appends the string `export { methodName } from './methodName'` to `__config__/customQueries/jest.customQueries.ts`
 * @param {string} customQueriesDirectoryPath Folder where the method folders are (src/methods)
 * @param {string} methodName
 *
 * Because the jest.customQueries.ts file exports an object,
 * we can't just append to the file like we did in `patchMethodIndexFile`
 *
 * We need to read the file, modify its contents, then write to it again
 */
module.exports.patchCustomQueriesIndexFile = async (customQueriesDirectoryPath, methodName) => {
  console.info("Adding customQuery export to jest.customQueries.ts");

  const customQueriesIndexFile = path.join(customQueriesDirectoryPath, "jest.customQueries.ts");

  const contents = await fsPromises.readFile(customQueriesIndexFile, { encoding: "utf8" });

  /**
   * @param {string} fileContents Contents of the `jest.customQueries.ts` file
   */
  const addNewCustomQuery = (fileContents) => {
    // like findIndex, but starts looking from the end of the array
    const customQueriesObjectClosingBraceIndex = fileContents.lastIndexOf("}");

    if (customQueriesObjectClosingBraceIndex === -1) {
      throw new Error("Couldn't find closing brace in jest.customQueries.ts");
    }

    const result = [...fileContents];

    // modified by reference
    result
      .splice(
        // at the index where the closing brace is ... (-1 because we need to add a comma to previous line)
        customQueriesObjectClosingBraceIndex - 1,
        // replace 0 array items (append only) ...
        0,
        // add the following contents
        ...`,\n  '${utils.kebabize(methodName)}-custom-query': ${methodName}`
      )
      .join("");

    result.unshift(`import { ${methodName} } from './${methodName}';\n`);

    return result;
  };

  const newContents = addNewCustomQuery(contents);

  console.info("Patching jest.customQueries.ts");
  await fsPromises.writeFile(customQueriesIndexFile, newContents);
};
