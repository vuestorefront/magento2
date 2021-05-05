'use strict'
module.exports = {
  globals: {
    __DEV__: true,
  },
  // noStackTrace: true,
  // bail: true,
  // cache: false,
  // verbose: true,
  // watch: true,
  coverageReporters: ['lcov'],

  coverageThreshold: {
    global: {
      //  branches: 50,
      //  functions: 50,
      //  lines: 50,
      //  statements: 50
    },
  },

  coveragePathIgnorePatterns: ['/node_modules/', '.d.ts$', '/__mocks__/'],
  collectCoverage: true,
  testEnvironment: 'jest-environment-jsdom-sixteen',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },

  coverageDirectory: './coverage/',

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],

  setupFiles: [
    'jest-date-mock',
    'jest-localstorage-mock',
  ],

  transformIgnorePatterns: [
    'node_modules',
    '<rootDir>/node_modules',
  ],

  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)'],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    ['jest-watch-toggle-config', { setting: 'notify' }],
    ['jest-watch-toggle-config', { setting: 'bail' }],
  ],
};
