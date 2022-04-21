import { render } from '@testing-library/vue';
import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { productsMock } from './productsMock';
import CategoryProductList from '../CategoryProductList.vue';

const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);
localVue.component('NuxtImg', { render(h) { return h('div'); } });

localVue.prototype.components = {
  components: {
    NuxtImg: 'div',
  },
};

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
    i18n: {
      t: jest.fn((label) => label),
    },
  },
};

describe('CategoryProductList', () => {
  it('hides \'Add to wishlist\' button when logged out', () => {});

  it('picks correct label for wishlist button', () => {});

  it('shows skeleton loader when loading', async () => {
    const { findAllByTestId } = render(CategoryProductList, { props: { loading: true, products: [] }, localVue, pinia: createTestingPinia() });
    const loadingSkeletons = await findAllByTestId('skeleton');
    expect(loadingSkeletons).not.toHaveLength(0);
  });

  it('shows products when loaded', async () => {
    const { findAllByTestId } = render(CategoryProductList, {
      props: { loading: false, products: productsMock },
      localVue,
      pinia: createTestingPinia(),
    });
    const products = await findAllByTestId('product-card');
    expect(products).toHaveLength(productsMock.length);
  });
});
