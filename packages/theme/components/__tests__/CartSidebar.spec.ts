import { render, waitFor, within } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useUser } from '~/modules/customer/composables/useUser';
import { useCart, useUiState } from '~/composables';

import {
  useCartMock, useUserMock, useUiStateMock, useEmptyCartMock,
} from '~/test-utils';
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

  describe('If the cart has two products', () => {
    beforeAll(() => {
      (useCart as jest.Mock).mockReturnValue(useCartMock());
      (useUiState as jest.Mock).mockReturnValue(useUiStateMock({ isCartSidebarOpen: true }));
    });

    it('renders two product cards', () => {
      const { queryAllByTestId } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
      expect(queryAllByTestId('cart-sidebar-collected-product')).toHaveLength(2);
    });

    it('displays proper item value', async () => {
      const { getByTestId } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
      const totalValue = getByTestId('cart-sidebar-total');

      await waitFor(() => {
        expect(totalValue.textContent).toContain('37');
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

    it('increases product quantity', async () => {
      const useCartMockInstance = useCartMock();
      (useCart as jest.Mock).mockReturnValue(useCartMockInstance);

      const { getByTestId } = render(
        CartSidebar,
        {
          localVue,
          pinia: createTestingPinia(),
        },
      );

      const quantitySelector = getByTestId('cart-sidebar-quantity-selector');
      const increaseQuantityButton = within(quantitySelector).getByTestId('increase');
      userEvent.click(increaseQuantityButton);

      await waitFor(() => {
        expect(useCartMockInstance.updateItemQty).toHaveBeenCalledWith({ product: '', quantity: 2 });
      });
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
