import { ComputedRef } from '@nuxtjs/composition-api';

export interface StateInterface {
  isCartSidebarOpen: boolean;
  isWishlistSidebarOpen: boolean;
  isLoginModalOpen: boolean;
  isNewsletterModalOpen: boolean;
  isCategoryGridView: boolean;
  isWishlistGridView: boolean;
  isFilterSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
}

/**
 * Data and methods returned from the {@link useUiState|useUiState()} composable
 */
export interface UseUiStateInterface {
  /**
   * Indicates whether the mobile menu is open
   */
  isMobileMenuOpen: ComputedRef<boolean>;

  /**
   * Indicates whether the cart sidebar is open
   */
  isCartSidebarOpen: ComputedRef<boolean>;

  /**
   * Indicates whether the wishlist sidebar is open
   */
  isWishlistSidebarOpen: ComputedRef<boolean>;

  /**
   * Indicates whether the login modal is open
   */
  isLoginModalOpen: ComputedRef<boolean>;

  /**
   * Indicates whether the newsletter modal is open
   */
  isNewsletterModalOpen: ComputedRef<boolean>;

  /**
   * Indicates whether the product list uses the grid layout
   */
  isCategoryGridView: ComputedRef<boolean>;

  /**
   * Indicates whether the wishlist uses the grid layout
   */
  isWishlistGridView: ComputedRef<boolean>;

  /**
   * Indicates whether the filter sidebar is open
   */
  isFilterSidebarOpen: ComputedRef<boolean>;

  /**
   * Toggles the visibility of the mobile menu
   */
  toggleMobileMenu(): void;

  /**
   * Toggles the visibility of the wishlist sidebar
   */
  toggleWishlistSidebar(): void;

  /**
   * Toggles the visibility of the login modal
   */
  toggleLoginModal(): void;

  /**
   * Toggles the visibility of the newsletter modal
   */
  toggleNewsletterModal(): void;

  /**
   * Changes the layout of the category page to grid
   */
  changeToCategoryGridView(): void;

  /**
   * Changes the layout of the category page to a list
   */
  changeToCategoryListView(): void;

  /**
   * Changes the layout of the wishlist to grid
   */
  changeToWishlistGridView(): void;

  /**
   * Changes the layout of the wishlist to a list
   */
  changeToWishlistListView(): void;

  /**
   * Toggles the visibility of the filter sidebar
   */
  toggleFilterSidebar(): void;

  /**
   * Toggles the visibility of the cart modal
   */
  toggleCartSidebar(): void;
}
