import { render, waitFor } from '@testing-library/vue';
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
  useExternalCheckout: jest.fn(() => ({ initializeCheckout: {} })),
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

    it('renders "go to checkout" button', () => {
      const { getByText } = render(CartSidebar, { localVue, pinia: createTestingPinia() });
      getByText('Go to checkout');
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
