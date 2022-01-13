// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

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

  coverageDirectory: './coverage/',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },

  testEnvironment: 'jest-environment-jsdom-sixteen',
  
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },

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
