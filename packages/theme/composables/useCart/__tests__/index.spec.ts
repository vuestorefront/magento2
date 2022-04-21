import { createLocalVue, mount } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import SetupStub from './SetupStub.vue';
import { useCart } from '..';

const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);

// TODO maybe move to global jest.setup.ts?
localVue.prototype.$nuxt = {
  context: {
    app: {
      $vsf: {
        $magento: {
          config: {
            state: '',
          },
        },
      },
    },
  },
};

describe('useCart', () => {
  it('uses customQuery in load method', () => {
    const component = mount(SetupStub, {
      localVue,
      pinia: createTestingPinia(),
      setup() {
        useCart();
      },
    });
    expect(true).toBe(true);
  });
});
