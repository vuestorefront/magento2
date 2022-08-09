import { computed, reactive } from '@nuxtjs/composition-api';
import { StateInterface, UseUiStateInterface } from '~/composables/useUiState/useUiState';

const state = reactive<StateInterface>({
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
    isWishlistSidebarOpen: computed(() => state.isWishlistSidebarOpen),
    isLoginModalOpen: computed(() => state.isLoginModalOpen),
    isNewsletterModalOpen: computed(() => state.isNewsletterModalOpen),
    isCategoryGridView: computed(() => state.isCategoryGridView),
    isWishlistGridView: computed(() => state.isWishlistGridView),
    isFilterSidebarOpen: computed(() => state.isFilterSidebarOpen),
    toggleMobileMenu,
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
