import { render } from '@testing-library/vue';
import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { productsMock } from './productsMock';
import CategoryProductList from '../CategoryProductList.vue';

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

describe('CategoryProductList', () => {
  it.each([
    [true, true],
    [false, false],
  ])('has correct \'Add to wishlist\' button visiblity when loggin state is %s', (isLoggedIn, expectedVisibility) => {
    const { queryByTestId } = render(CategoryProductList, {
      props: {
        loading: false,
        products: [productsMock[0]],
      },
      localVue,
      pinia: createTestingPinia({ initialState: { customer: { isLoggedIn } } }),
    });
    expect(Boolean(queryByTestId('wishlist-button'))).toBe(expectedVisibility);
  });

  it('shows skeleton loader when loading', async () => {
    const { findAllByTestId } = render(CategoryProductList, {
      props: {
        loading: true,
        products: [],
      },
      localVue,
      pinia: createTestingPinia(),
    });
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
