import { computed, reactive } from '@nuxtjs/composition-api';
import { StateInterface, UseUiStateInterface } from '~/composables/useUiState/useUiState';

const state = reactive<StateInterface>({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isWishlistGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
});

/**
 * Global store for managing UI state.
 *
 * See the {@link UseUiStateInterface} for a list of methods and values available in this composable.
 */
export function useUiState(): UseUiStateInterface {
  const toggleMobileMenu = () => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
  };

  const toggleCartSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const toggleNewsletterModal = () => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen;
  };

  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const changeToWishlistGridView = () => {
    state.isWishlistGridView = true;
  };

  const changeToWishlistListView = () => {
    state.isWishlistGridView = false;
  };
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  return {
    isMobileMenuOpen: computed(() => state.isMobileMenuOpen),
    isCartSidebarOpen: computed(() => state.isCartSidebarOpen),
    isWishlistSidebarOpen: computed(() => state.isWishlistSidebarOpen),
    isLoginModalOpen: computed(() => state.isLoginModalOpen),
    isNewsletterModalOpen: computed(() => state.isNewsletterModalOpen),
    isCategoryGridView: computed(() => state.isCategoryGridView),
    isWishlistGridView: computed(() => state.isWishlistGridView),
    isFilterSidebarOpen: computed(() => state.isFilterSidebarOpen),
    toggleMobileMenu,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    changeToWishlistGridView,
    changeToWishlistListView,
    toggleFilterSidebar,
  };
}

export default useUiState;
export * from './useUiState';
