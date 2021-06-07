/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const { exec } = require("child_process");
const path = require('path');
const { getTag } = require('./getTags');

const publishPackages = (labels) => {
  return new Promise((res, rej) => {
    exec(`npm publish ${path.join(process.cwd(), 'packages', 'composables')} --access public --tag ${getTag(labels)}`, (code, stdout, stderr) => {
      if (code !== 0) {
        console.error(`error: ${code}`);
        return rej(code);
      }

      console.log(`stdout: ${stdout}`);
      res();
    });
  });
}

module.exports = {
  publishPackages,
}
