#!/usr/bin/env node
const fsPromises = require("fs/promises");
const path = require("path");
const fileOperations = require("./file-operations");

// Use IIFE for "top level await", because regular top level await is not present in raw node 16
// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
  const methodName = process.argv[2];

  if (!methodName) {
    console.error("\nerror: method name missing\nusage: npx mkmethod [method name]\n");
    return;
  }

  const folderWhereTheCommandWasRanIn = process.cwd();

  const folders = {
    testIntegrations: path.join(folderWhereTheCommandWasRanIn, "__tests__", "integration"),
    testUnit: path.join(folderWhereTheCommandWasRanIn, "__tests__", "unit"),
    methods: path.join(folderWhereTheCommandWasRanIn, "src", "methods"),
    customQueries: path.join(folderWhereTheCommandWasRanIn, "__tests__", "integration", "__config__", "customQueries"),
  };

  // Checks if all folders required folders are accessible

  try {
    await Promise.all(Object.values(folders).map((folderPath) => fsPromises.access(folderPath)));
  } catch (e) {
    throw new Error("The method bootstrapper expects a certain directory structure. One of the folders is inaccessible", { cause: e });
  }

  await fileOperations.createMethodImplementationFile(folders.methods, methodName);

  await fileOperations.patchMethodIndexFile(folders.methods, methodName);

  await fileOperations.createMethodUnitTestFile(folders.testUnit, methodName);

  await fileOperations.createMethodIntegrationTestFile(folders.testIntegrations, methodName);

  await fileOperations.createMethodCustomQueryFile(folders.customQueries, methodName);

  await fileOperations.patchCustomQueriesIndexFile(folders.customQueries, methodName);
})();
