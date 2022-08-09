import { computed } from '@nuxtjs/composition-api';

export const useUiStateMock = (extend = {}) => ({
  isMobileMenuOpen: computed(() => false),
  changeToCategoryGridView: jest.fn(),
  changeToCategoryListView: jest.fn(),
  toggleFilterSidebar: jest.fn(),
  toggleWishlistSidebar: jest.fn(),
  toggleMobileMenu: jest.fn(),
  ...extend,
});

export default useUiStateMock;
