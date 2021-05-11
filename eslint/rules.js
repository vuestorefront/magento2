module.exports = {
  'no-console': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
  'no-debugger': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
  'prefer-promise-reject-errors': 'off',
  'no-shadow': 'off',
  'no-redeclare': 'off',
  'no-unused-vars': 'off',
  'no-case-declarations': 0,
  quotes: ['warn', 'single'],
  'no-unused-expressions': ['warn', {
    'allowShortCircuit': true,
    'allowTernary': true,
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
};
