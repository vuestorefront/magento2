import { render } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import CategoryProductGrid from '../CategoryProductGrid.vue';
import { productsMock } from './productsMock';

const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);

jest.mock('~/composables', () => {
  const originalComposables = jest.requireActual('~/composables');
  return {
    ...originalComposables,
    useUiNotification: jest.fn(() => ({
      send: jest.fn(),
    })),
  };
});

describe('CategoryProductGrid', () => {
  it('shows skeleton loader when loading', async () => {
    const { findAllByTestId } = render(CategoryProductGrid, { props: { loading: true, products: [] }, localVue, pinia: createTestingPinia() });
    const loadingSkeletons = await findAllByTestId('skeleton');
    expect(loadingSkeletons).not.toHaveLength(0);
  });

  it('shows products when loaded', async () => {
    const { findAllByTestId } = render(CategoryProductGrid, {
      props: {
        loading: false,
        products: productsMock,
      },
      localVue,
      pinia: createTestingPinia(),
    });
    const products = await findAllByTestId('product-card');
    expect(products).toHaveLength(productsMock.length);
  });
});
