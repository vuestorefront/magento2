/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const { exec } = require("child_process");
const path = require('path');
const { getTag } = require('./getTags');

const publishPackages = (labels) => {
  return new Promise((res, rej) => {
    try {
      const command = `npm publish ${path.join(process.cwd(), 'packages', 'composables')} --access public --tag ${getTag(labels)}`;

      console.log(command)

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    } catch (e) {
      console.error(e);
    }
  });
}

module.exports = {
  publishPackages,
}
