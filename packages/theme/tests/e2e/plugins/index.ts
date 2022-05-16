/* eslint-disable unicorn/prefer-module */
// using import does not work since cypress-tags is commonjs
const tagify = require('cypress-tags');

const pluginConfig : Cypress.PluginConfig = (on, config) => {
  // tagify does not ship types
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  on('file:preprocessor', tagify(config));
};

export default pluginConfig;
