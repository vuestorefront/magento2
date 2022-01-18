import userEvent from '@testing-library/user-event';
import {
  useCart,
  useUser,
} from '@vue-storefront/magento';

import { useUiState } from '~/composables';
import {
  render, useCartMock, useUserMock, useUiStateMock, useEmptyCartMock,
} from '~/test-utils';
import CartSidebar from '~/components/CartSidebar';

jest.mock('@vue-storefront/magento', () => ({
  ...jest.requireActual('@vue-storefront/magento'),
  useExternalCheckout: jest.fn(() => ({ initializeCheckout: {} })),
  useCart: jest.fn(),
  useUser: jest.fn(),
}));

jest.mock('~/composables/useUiState');

useUser.mockReturnValue(useUserMock());
useCart.mockReturnValue(useCartMock());

describe('<CartSidebar>', () => {
  it('should be not visible by default', () => {
    useUiState.mockReturnValue(useUiStateMock());
    const { queryByText } = render(CartSidebar);
    expect(queryByText('My Cart')).toBeNull();
  });

  describe('If the cart is empty', () => {
    beforeAll(() => {
      useCart.mockReturnValue(useEmptyCartMock());
    });
    describe('And the cart sidebar is open', () => {
      it('should render empty state', () => {
        useUiState.mockReturnValue(useUiStateMock({ isCartSidebarOpen: true }));
        const { queryByText } = render(CartSidebar);
        expect(queryByText('Your cart is empty')).toBeTruthy();
      });

      it('go back button must close the cart sidebar', () => {
        const uiStateMock = useUiStateMock({ isCartSidebarOpen: true });
        useUiState.mockReturnValue(uiStateMock);
        const { queryByText } = render(CartSidebar);
        const closeSidebarBtn = queryByText('Go back shopping');
        expect(closeSidebarBtn).toBeTruthy();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        userEvent.click(closeSidebarBtn);
        expect(uiStateMock.toggleCartSidebar).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('If the cart has two products', () => {
    beforeAll(() => {
      useCart.mockReturnValue(useCartMock());
      useUiState.mockReturnValue(useUiStateMock({ isCartSidebarOpen: true }));
    });

    it('should render two Product Cards', () => {
      const { container } = render(CartSidebar);
      const productCards = container.querySelectorAll('div.sf-collected-product');
      expect(productCards).toHaveLength(2);
    });

    it('should display proper total items value', () => {
      const { container } = render(CartSidebar);
      const totalItemsLValue = container.querySelector('div.cart-summary .sf-property__value');
      const totalItemsLabel = container.querySelector('div.cart-summary .sf-property__name');
      expect(totalItemsLabel).toHaveTextContent('Total items');
      expect(totalItemsLValue).toHaveTextContent(2);
    });

    it('should render "go to checkout" button', () => {
      const { getByText } = render(CartSidebar);
      expect(getByText('Go to checkout')).toBeTruthy();
    });

    it('should render promo code input', () => {
      const { getByTestId } = render(CartSidebar);
      expect(getByTestId('promoCode')).toBeTruthy();
    });

    describe('And exactly one product is out of stock', () => {
      it('should display exactly one out of stock badge', () => {
        const { getAllByText } = render(CartSidebar);
        expect(getAllByText('Out of stock')).toHaveLength(1);
      });
    });
  });
});
