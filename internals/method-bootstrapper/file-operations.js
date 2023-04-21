// This file contains functions that modify files in such a way that add a new SDK method

const fsPromises = require('fs/promises');
const path = require('path');
const handlebars = require('handlebars');
const utils = require('./utils');

/**
 * Creates 'src/methods/methodName/index.ts' with partially filled out content
 * It uses a Handlebars template (JS template string was too painful)
 * @see File ./handlebars-templates/method-implementation.handlebars
 *
 * @param {string} methodsDirectoryPath Folder where the method folders are (src/methods)
 * @param {string} methodName Name of the method to create
 */
module.exports.createMethodImplementationFile = async (methodsDirectoryPath, methodName) => {
  console.info('Creating method folder');
  const methodFolderPath = path.join(methodsDirectoryPath, methodName);

  await fsPromises.mkdir(
    methodFolderPath,
  );

  const template = handlebars.compile(
    await fsPromises.readFile(
      path.join(
        __dirname,
        'handlebars-templates',
        'method-implementation-file.handlebars',
      ),
      { encoding: 'utf8' },
    ),
  );

  const contents = template({
    camelCaseMethodName: methodName,
    kebabCaseMethodName: utils.kebabize(methodName),
    capitalizedMethodName: utils.capitalize(methodName),
  });

  console.info('Creating method implementation file');
  await fsPromises.writeFile(
    path.join(methodFolderPath, 'index.ts'),
    contents,
  );
};

/**
 * Appends the string `export { methodName } from './methodName'` to `src/methods/index.ts`
 * @param {string} methodsDirectoryPath Folder where the method folders are (src/methods)
 * @param {string} methodName
 */
module.exports.patchMethodIndexFile = async (methodsDirectoryPath, methodName) => {
  console.info('Adding method export to methods index.ts');
  await fsPromises.appendFile(
    path.join(methodsDirectoryPath, 'index.ts'),
    `export { ${methodName} } from './${methodName}';`,
  );
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
    await fsPromises.readFile(
      path.join(
        __dirname,
        'handlebars-templates',
        'method-integration-test-file.handlebars',
      ),
      { encoding: 'utf8' },
    ),
  );

  const contents = template({
    camelCaseMethodName: methodName,
    kebabCaseMethodName: utils.kebabize(methodName),
    capitalizedMethodName: utils.capitalize(methodName),
  });

  console.info('Creating method integration test file');
  await fsPromises.writeFile(
    path.join(integrationTestDirectoryPath, `${methodName}.integration.spec.ts`),
    contents,
  );
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
    await fsPromises.readFile(
      path.join(
        __dirname,
        'handlebars-templates',
        'method-unit-test-file.handlebars',
      ),
      { encoding: 'utf8' },
    ),
  );

  const contents = template({
    camelCaseMethodName: methodName,
    kebabCaseMethodName: utils.kebabize(methodName),
    capitalizedMethodName: utils.capitalize(methodName),
  });

  console.info('Creating method unit test file');
  await fsPromises.writeFile(
    path.join(unitTestDirectoryPath, `${methodName}.unit.spec.ts`),
    contents,
  );
};
