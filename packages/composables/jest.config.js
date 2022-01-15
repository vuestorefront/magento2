const baseConfig = require('../../jest.base.config');

module.exports = {
  ...baseConfig,
  coverageReporters: ['html', 'lcov', 'text'],
  rootDir: __dirname,
  watchPathIgnorePatterns: ['/node_modules/'],
};
