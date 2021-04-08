import { integrationPlugin } from '@vue-storefront/core'
import { loadState } from '@vue-storefront/magento/nuxt/helpers';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, integration }) => {
  const settings = Object.assign({}, {...moduleOptions});
  const state = loadState(app, settings);

  integration.configure('ma', {
    ...settings,
    state
  });
});
