import '@testing-library/jest-dom';
import Vue from 'vue';
import { config } from '@vue/test-utils';

config.stubs = {
  NuxtImg: { render(h) { return h('img'); } },
};
config.mocks = {
  $t: (text) => text,
  $fc: (text) => text,
  localePath: (text) => text,
  localeRouter: (route) => route,
};

const $vsf = {
  $magento: {
    config: {
      imageProvider: '',
      magentoBaseUrl: '',
      state: {
        getMessage: jest.fn(),
      },
    },
  },
};

// mocks object returned by useContext()
Vue.prototype.$nuxt = {
  context: {
    $vsf,
    $fc: jest.fn((label) => label),
    localeRoute: jest.fn((route) => route),
    localePath: jest.fn((link) => link),
    app: {
      // $vsf intentionally doubled in context top level AND in context.app - this is the way it's in the app
      $vsf,
      context: {
        $vsf,
      },
      $fc: jest.fn((label) => label),
      localePath: jest.fn((link) => link),
      localeRoute: jest.fn((path) => path),
    },
    i18n: {
      t: jest.fn((label) => label),
    },
  },
};

Vue.directive('e2e', {});
