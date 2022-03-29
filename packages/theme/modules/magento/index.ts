/* eslint-disable unicorn/prefer-module */
const path = require('path');

// eslint-disable-next-line func-names
export default function (options) {
  this.extendBuild((config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@vue-storefront/magento-api$'] = require.resolve('@vue-storefront/magento-api');
  });

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.ts'),
    options,
  });
}
