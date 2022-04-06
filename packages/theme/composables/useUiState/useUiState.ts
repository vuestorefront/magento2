import { ComputedRef } from '@nuxtjs/composition-api';

export interface StateInterface {
  isCartSidebarOpen: boolean,
  isWishlistSidebarOpen: boolean,
  isLoginModalOpen: boolean,
  isNewsletterModalOpen: boolean,
  isCategoryGridView: boolean,
  isWishlistGridView: boolean,
  isFilterSidebarOpen: boolean,
  isMobileMenuOpen: boolean,
}

export interface UseUiStateInterface {
  isMobileMenuOpen: ComputedRef<boolean>,
  toggleMobileMenu (): void,
  isCartSidebarOpen: ComputedRef<boolean>,
  isWishlistSidebarOpen: ComputedRef<boolean>,
  toggleWishlistSidebar (): void,
  isLoginModalOpen: ComputedRef<boolean>,
  toggleLoginModal (): void,
  isNewsletterModalOpen: ComputedRef<boolean>,
  toggleNewsletterModal (): void,
  isCategoryGridView: ComputedRef<boolean>,
  isWishlistGridView: ComputedRef<boolean>,
  changeToCategoryGridView (): void,
  changeToCategoryListView (): void,
  changeToWishlistGridView (): void,
  changeToWishlistListView (): void,
  isFilterSidebarOpen: ComputedRef<boolean>,
  toggleFilterSidebar (): void,
  toggleCartSidebar (): void,
}
