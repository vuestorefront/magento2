import { Module } from '@nuxt/types';

/* eslint-disable unicorn/prefer-module */
const path = require('path');

const nuxtModule : Module = function magentoModule(options) {
  this.extendBuild((config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@vue-storefront/magento-api$'] = require.resolve('@vue-storefront/magento-api');
  });

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.ts'),
    options,
  });
};

export default nuxtModule;
