/* eslint-disable unicorn/prefer-module */
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
  collectCoverage: false,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json', 'ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(css|svg)': 'jest-transform-stub',
  },

  coverageDirectory: './coverage/',

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],

  setupFiles: [
    'jest-date-mock',
    'jest-localstorage-mock',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(@storefront-ui)|vee-validate/dist/rules|nouislider)',

  ],

  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)'],

  modulePathIgnorePatterns: ['_theme', 'tests/e2e'],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    ['jest-watch-toggle-config', { setting: 'notify' }],
    ['jest-watch-toggle-config', { setting: 'bail' }],
  ],
};
