import { render, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { ref } from '@nuxtjs/composition-api';
import { useUser } from '~/modules/customer/composables/useUser';
import { useUiState } from '~/composables';
import { useUiStateMock, useUserMock } from '~/tests/unit/test-utils';

import { useCategoryStore } from '~/modules/catalog/category/stores/category';
import BottomNavigation from '../BottomNavigation.vue';

jest.mock('~/composables/useUiState', () => ({
  useUiState: jest.fn(),
}));

jest.mock('~/modules/customer/composables/useUser', () => ({
  useUser: jest.fn(),
}));

(useUser as jest.Mock).mockReturnValue(useUserMock());
(useUiState as jest.Mock).mockReturnValue(useUiStateMock());

const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);

describe('BottomNavigation', () => {
  it('handles "Home" button click', async () => {
    const routerPushMock = jest.fn();

    const { getByTestId } = render(
      BottomNavigation,
      {
        mocks: {
          $router: {
            push: routerPushMock,
          },
          $route: {
            name: 'home',
          },
        },
        localVue,
        pinia: createTestingPinia(),
      },
    );

    const homeButton = getByTestId('bottom-navigation-home');
    userEvent.click(homeButton);
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith({ name: 'home' });
    });
  });
  it('handles "Menu" (categories) button click', async () => {
    const { getByTestId } = render(
      BottomNavigation,
      {
        mocks: {
          $route: {
            name: 'home',
          },
        },
        localVue,
        pinia: createTestingPinia(),
      },
    );

    const categoryStore = useCategoryStore();

    const menuButton = getByTestId('bottom-navigation-menu');
    userEvent.click(menuButton);
    await waitFor(() => {
      expect(categoryStore.load).toHaveBeenCalled();
    });
  });
  it('handles "Wishlist" button click', async () => {
    const useUiStateMockInstance = useUiStateMock();
    (useUiState as jest.Mock).mockReturnValueOnce(useUiStateMockInstance);
    const useUserMockInstance = useUserMock({ isAuthenticated: ref(true) });
    (useUser as jest.Mock).mockReturnValueOnce(useUserMockInstance);

    const { getByTestId } = render(
      BottomNavigation,
      {
        mocks: {
          $route: {
            name: 'home',
          },
        },
        localVue,
        pinia: createTestingPinia(),
      },
    );

    const wishlistButton = getByTestId('bottom-navigation-wishlist');
    userEvent.click(wishlistButton);
    await waitFor(() => {
      expect(useUiStateMockInstance.toggleWishlistSidebar).toHaveBeenCalled();
    });
  });
  it('handles "Account" button click', async () => {
    const useUiStateMockInstance = useUiStateMock();
    (useUiState as jest.Mock).mockReturnValueOnce(useUiStateMockInstance);
    const useUserMockInstance = useUserMock({ isAuthenticated: ref(true) });
    (useUser as jest.Mock).mockReturnValueOnce(useUserMockInstance);

    const routerPushMock = jest.fn();

    const { getByTestId } = render(
      BottomNavigation,
      {
        mocks: {
          $router: {
            push: routerPushMock,
          },
          $route: {
            name: 'home',
          },
        },
        localVue,
        pinia: createTestingPinia(),
      },
    );

    const accountButton = getByTestId('bottom-navigation-account');
    userEvent.click(accountButton);
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith({ name: 'customer' });
    });
  });
  it('handles "Cart" button click', async () => {
    const useUiStateMockInstance = useUiStateMock();
    (useUiState as jest.Mock).mockReturnValueOnce(useUiStateMockInstance);
    const useUserMockInstance = useUserMock({ isAuthenticated: ref(true) });
    (useUser as jest.Mock).mockReturnValueOnce(useUserMockInstance);

    const { getByTestId } = render(
      BottomNavigation,
      {
        mocks: {
          $route: {
            name: 'home',
          },
        },
        localVue,
        pinia: createTestingPinia(),
      },
    );

    const cartButton = getByTestId('bottom-navigation-cart');
    userEvent.click(cartButton);
    await waitFor(() => {
      expect(useUiStateMockInstance.toggleCartSidebar).toHaveBeenCalled();
    });
  });
});
