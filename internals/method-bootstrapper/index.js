const fsPromises = require('fs/promises');
const path = require('path');

const methodName = process.argv[2];

// use Immediately Invoked Function Expression because I want to use top level await
if (!methodName) {
  throw new Error('usage: mkmethod [method name]');
}

// TODO check if repo root
const folderWhereTheCommandWasRanIn = process.cwd();

const folders = {
  testIntegrations: path.join(folderWhereTheCommandWasRanIn, '__tests__', 'integration'),
  testUnit: path.join(folderWhereTheCommandWasRanIn, '__tests__', 'unit'),
  methods: path.join(folderWhereTheCommandWasRanIn, 'src', 'methods'),
};

// check if all folders are accessible
try {
  await Promise.all(
    Object.values(folders)
      .map((folderPath) => fsPromises.access(folderPath)),
  );
} catch (e) {
  throw new Error('The method bootstrapper expects a certain directory structure. One of the folders is inaccessible', { cause: e });
}

await fsPromises.appendFile(
  path.join(folders.methods, 'index.ts'),
  `export ${methodName} from '${methodName}'`,
);
