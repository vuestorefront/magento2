const baseConfig = require('./../../jest.base.config');

/* eslint-disable unicorn/prefer-module */
module.exports = {
  ...baseConfig,
  
  collectCoverageFrom: [
    '<rootDir>/composables/**/*.ts'
  ],

  moduleFileExtensions: ['js', 'json', 'ts'],
  
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },

  testEnvironment: 'jsdom',

};
