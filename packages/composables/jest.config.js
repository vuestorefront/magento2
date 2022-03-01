/* eslint-disable unicorn/prefer-module */
module.exports = {
  globals: {
    __DEV__: true,
  },
  coverageReporters: [
    'lcov',
  ],
  coverageThreshold: {
    global: {},
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.d.ts$',
    '/__mocks__/',
  ],
  coverageDirectory: './coverage/',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(m)js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules',
    '<rootDir>/node_modules',
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/*spec.[jt]s?(x)',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-toggle-config',
      {
        setting: 'verbose',
      },
    ],
    [
      'jest-watch-toggle-config',
      {
        setting: 'collectCoverage',
      },
    ],
    [
      'jest-watch-toggle-config',
      {
        setting: 'notify',
      },
    ],
    [
      'jest-watch-toggle-config',
      {
        setting: 'bail',
      },
    ],
  ],
  collectCoverageFrom: [
    '<rootDir>/composables/**/*.ts',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
};
