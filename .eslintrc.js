const { resolve } = require('path');

module.exports = {
  env: {
    jest: true,
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: [
      resolve(__dirname, './tsconfig.base.json'),
      resolve(__dirname, './packages/api-client/tsconfig.json'),
      resolve(__dirname, './packages/composables/tsconfig.json'),
      resolve(__dirname, './packages/theme/tsconfig.json')
    ],
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'vue',
    'import',
    'unicorn',
    'jest',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
  ],
  rules: {
    'prefer-const': 2,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
    'no-debugger': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
    'unicorn/no-new-array': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-array-some': 'off',
    'unicorn/catch-error-name': [
      2,
      {
        name: 'error',
        ignore: ['^e(rr)?$'],
      },
    ],
    indent: 'off',
    'prefer-promise-reject-errors': 'off',
    'no-shadow': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
    'unicorn/no-null': 0,
    'unicorn/no-reduce': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-object-as-default-parameter': 0,
    'unicorn/no-abusive-eslint-disable': 0,
    'unicorn/consistent-function-scoping': 0,
    'unicorn/consistent-destructuring': 0,
    'unicorn/filename-case': [
      0,
      {
        cases: {
          kebabCase: false,
          pascalCase: true,
          camelCase: true,
        },
        // ignore UPPER_CASE markdown filenames
        ignore: [/^[A-Z](([\dA-Z]+_)*[\dA-Z]+)?\.(mdx|d\.ts)?$/],
      },
    ],
    quotes: ['warn', 'single'],
    'no-unused-expressions': ['warn', {
      'allowShortCircuit': true,
      'allowTernary': true,
    }],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'ignoreRestSiblings': true,
      'argsIgnorePattern': '^_',
      'caughtErrorsIgnorePattern': '^ignore',
    }],
    'max-len': ['error', {
      code: 150,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
    }],
    'class-methods-use-this': 'off',
    'no-new': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unnecessary-type-assertion': 0,
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'options', // for decorators
      ],
    }],
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/export': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off', // Allow single Named-export
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/prefer-to-have-length': 'warn',
  },
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
      typescript: {},
    },
  },
}
