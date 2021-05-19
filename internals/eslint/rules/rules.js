module.exports = {
  rules: {
    // region ESLINT RULES
    'no-console': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
    'no-debugger': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
    'prefer-promise-reject-errors': 'off',
    'no-shadow': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 0,
    quotes: ['warn', 'single'],
    'no-unused-expressions': ['warn', {
      allowShortCircuit: true,
      allowTernary: true,
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
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'options', // for decorators
      ],
    }],
    // endregion
    // region UNICORN RULES
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
    // endregion
  },
};
