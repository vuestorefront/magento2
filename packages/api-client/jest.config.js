const baseConfig = require('./../../jest.base.config');

/* eslint-disable unicorn/prefer-module */
module.exports = {
  ...baseConfig,

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],

  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    'api-client(.*)$': '<rootDir>$1',
  },

  moduleFileExtensions: ['js', 'json', 'ts'],

  testEnvironment: 'jsdom',

  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

};
