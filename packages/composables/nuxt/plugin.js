import { integrationPlugin } from '@vue-storefront/magento-composables';
import { loadState } from '@vue-storefront/magento-composables/nuxt/helpers';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export default integrationPlugin(({ app, integration }) => {
  const settings = Object.assign({}, {...moduleOptions});
  const state = loadState(app, settings);

  integration.configure({
    ...settings,
    state
  });
});
