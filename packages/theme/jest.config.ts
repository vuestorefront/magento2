import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsConfig from './tsconfig.json';

export default (): Config.InitialOptions => ({
  preset: 'ts-jest',
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(css|svg)': 'jest-transform-stub',
  },

  coverageDirectory: './coverage/',

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/middleware/**/*.js',
    '<rootDir>/plugins/**/*.js',
  ],

  setupFiles: [
    'jest-date-mock',
    'jest-localstorage-mock',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],

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
});
