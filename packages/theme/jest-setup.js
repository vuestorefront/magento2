import '@testing-library/jest-dom';
import Vue from 'vue';
import { config } from '@vue/test-utils';

config.stubs = {
  NuxtImg: { render(h) { return h('img'); } },
};
config.mocks = {
  $t: (text) => text
}

const $vsf = {
  $magento: {
    config: {
      imageProvider: '',
      magentoBaseUrl: '',
      state: {},
    },
  },
};

// mocks object returned by useContext()
Vue.prototype.$nuxt = {
  context: {
    $vsf,
    app: {
      // $vsf intentionally doubled in context top level AND in context.app - this is the way it's in the app
      $vsf,
      $fc: jest.fn((label) => label),
      localePath: jest.fn((link) => link),
    },
    i18n: {
      t: jest.fn((label) => label),
    },
  },
};

Vue.directive('e2e', {});
