// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  rules: {
    'vue/block-lang': ['error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/no-setup-props-destructure': 0,
    'vue/no-v-html': 0,
    'vue/no-v-text-v-html-on-component': 0,
  },
};
