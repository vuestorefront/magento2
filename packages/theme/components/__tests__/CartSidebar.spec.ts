import { render, waitFor, within } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useUser } from '~/modules/customer/composables/useUser';
import { useCart, useUiState } from '~/composables';

import {
  useCartMock, useUserMock, useUiStateMock, useEmptyCartMock,
} from '~/tests/unit/test-utils';
import CartSidebar from '~/components/CartSidebar.vue';

jest.mock('~/composables', () => ({
  ...(jest.requireActual('~/composables') as object),
  useExternalCheckout: jest.fn(() => ({ initializeCheckout: jest.fn(() => '/checkout-url') })),
  useUiState: jest.fn(),
}));

jest.mock('~/modules/customer/composables/useUser');
jest.mock('~/modules/checkout/composables/useCart');

(useUser as jest.Mock).mockReturnValue(useUserMock());
(useCart as jest.Mock).mockReturnValue(useCartMock());

const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);

describe('CartSidebar', () => {
  it('should be not visible by default', () => {
    (useUiState as jest.Mock).mockReturnValue(useUiStateMock());
    const { queryByText } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
    expect(queryByText('My Cart')).toBeNull();
  });

  describe('If the cart is empty', () => {
    beforeAll(() => {
      (useCart as jest.Mock).mockReturnValue(useEmptyCartMock());
    });
    describe('And the cart sidebar is open', () => {
      it('renders empty state', () => {
        (useUiState as jest.Mock).mockReturnValue(useUiStateMock({ isCartSidebarOpen: true }));
        const { queryByText } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
        expect(queryByText('Your cart is empty')).toBeTruthy();
      });

      it('clicking go back button closes the sidebar', async () => {
        const uiStateMock = useUiStateMock({ isCartSidebarOpen: true });
        (useUiState as jest.Mock).mockReturnValue(uiStateMock);
        const { queryByTestId } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
        const closeSidebarBtn = queryByTestId('cart-sidebar-back');
        userEvent.click(closeSidebarBtn);

        await waitFor(() => {
          expect(uiStateMock.toggleCartSidebar).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('If the cart has three products', () => {
    beforeAll(() => {
      (useCart as jest.Mock).mockReturnValue(useCartMock());
      (useUiState as jest.Mock).mockReturnValue(useUiStateMock({ isCartSidebarOpen: true }));
    });

    it('renders product cards', () => {
      const { getAllByTestId } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
      expect(getAllByTestId('cart-sidebar-collected-product')).toHaveLength(3);
    });

    it('displays proper item value', async () => {
      const useCartMockInstance = useCartMock();
      const { getByTestId } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
      const totalValue = getByTestId('cart-sidebar-total');
      const expectedTotal = String(useCartMockInstance.cart.value.prices.grand_total.value);

      await waitFor(() => {
        expect(totalValue.textContent).toContain(expectedTotal);
      });
    });

    it('handles navigating to checkout', async () => {
      const mockedRouterPush = jest.fn();
      const { getByTestId } = render(
        CartSidebar,
        {
          localVue,
          pinia: createTestingPinia(),
          mocks: {
            $router: {
              push: mockedRouterPush,
            },
          },
        },
      );

      const goToCheckoutButton = getByTestId('category-sidebar-go-to-checkout');
      userEvent.click(goToCheckoutButton);

      await waitFor(() => {
        expect(mockedRouterPush).toHaveBeenCalledWith('/checkout-url');
      });
    });

    it('shows configurable options', async () => {
      const useCartMockInstance = useCartMock();
      (useCart as jest.Mock).mockReturnValue(useCartMockInstance);

      const { getAllByTestId } = render(
        CartSidebar,
        {
          localVue,
          pinia: createTestingPinia(),
        },
      );

      const [{ configurable_options: attributes }] = useCartMockInstance.cart.value.items;

      await waitFor(() => {
        const attributeContainer = getAllByTestId('cart-sidebar-attribute-container')[0];
        attributes.forEach(
          ({ option_label }) => expect(attributeContainer.textContent).toContain(option_label),
        );
      });
    });

    it('shows products from bundle', async () => {
      const useCartMockInstance = useCartMock();
      (useCart as jest.Mock).mockReturnValue(useCartMockInstance);

      const { getByTestId } = render(
        CartSidebar,
        {
          localVue,
          pinia: createTestingPinia(),
        },
      );

      const { bundle_options: bundleOptions } = useCartMockInstance.cart.value.items[2];

      await waitFor(() => {
        const bundleContainer = getByTestId('cart-sidebar-bundle-container');
        bundleOptions.forEach(
          ({ label }) => expect(bundleContainer.textContent).toContain(label),
        );
      });
    });

    it('increases product quantity', async () => {
      const useCartMockInstance = useCartMock();
      (useCart as jest.Mock).mockReturnValue(useCartMockInstance);

      const { getAllByTestId } = render(
        CartSidebar,
        {
          localVue,
          pinia: createTestingPinia(),
        },
      );

      const secondProductElement = getAllByTestId('cart-sidebar-collected-product')[1];
      const increaseQuantityButton = within(secondProductElement).getByTestId('increase');
      userEvent.click(increaseQuantityButton);

      await waitFor(() => {
        const { uid: uidOfSecondProduct } = useCartMockInstance.cart.value.items[1];
        expect(useCartMockInstance.updateItemQty).toHaveBeenCalledWith({
          product: expect.objectContaining({ uid: uidOfSecondProduct }),
          quantity: 2,
        });
      }, { timeout: 4500 });
    });

    it('removes products from cart', async () => {
      const useCartMockInstance = useCartMock();
      (useCart as jest.Mock).mockReturnValue(useCartMockInstance);
      const { getByTestId, getAllByTestId } = render(
        CartSidebar,
        {
          localVue,
          pinia: createTestingPinia(),
        },
      );
      userEvent.click(getAllByTestId('collected-product-desktop-remove')[0]);
      userEvent.click(getByTestId('cart-sidebar-remove-item-yes'));
      await waitFor(() => {
        const { uid: uidOfFirstProduct } = useCartMockInstance.cart.value.items[0];
        expect(useCartMockInstance.removeItem).toHaveBeenCalledWith(
          {
            product: expect.objectContaining({ uid: uidOfFirstProduct }),
          },
        );
      });
    });

    it('renders promo code input', () => {
      const { getByTestId } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
      getByTestId('promo-code');
    });

    describe('And exactly one product is out of stock', () => {
      it('should display exactly one out of stock badge', () => {
        const { getAllByText } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
        expect(getAllByText('Out of stock')).toHaveLength(1);
      });
    });
  });
});
