const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(j|t)s$': 'ts-jest'
  },
  setupFilesAfterEnv: ['./__tests__/integration/__config__/jest.setup.ts']
};
