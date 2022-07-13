import { render } from '@testing-library/vue';
import deepmerge from 'deepmerge';

const $t = (text) => text;
const $n = (text) => text;
const $fc = (text) => text;
const $dompurify = (text) => text;
const localePath = (path) => path;
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const customRender = (component, options = {}, callback = null) => render(component, deepmerge({
  mocks: {
    $t,
    $n,
    $fc,
    $dompurify,
    localePath,
    $i18n: {
      t: jest.fn((value) => value),
    },
    $nuxt: {
      context: {
        app: {
          localePath,
          $cookies: {
            get: jest.fn(),
          },
        },
      },
    },
  },
  stubs: {
    NuxtImg: {
      template: '<img src="image-stub.png" class="nuxt-img" alt="image"/>',
    },
    recaptcha: {
      template: '<div data-testid="recaptcha" />',
    },
    i18n: {
      template: '<div><slot /></div>',
    },
  },
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
}, options), callback);

export * from '@testing-library/vue';
export * from '~/tests/unit/mocks';
export { customRender as render };
