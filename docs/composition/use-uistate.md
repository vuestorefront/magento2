# useUiState composable

`useUiState` composable to manipulate global store for managing UI state.

## API
`useUiState` composable returns the following properties:

- `toggleMobileMenu` - function that toggles the visibility of the mobile menu.
- `toggleWishlistSidebar` - function that toggles the visibility of the wishlist sidebar.
- `toggleLoginModal` - function that toggles the visibility of the login modal.
- `toggleNewsletterModal` - function that toggles the visibility of the newsletter modal.
- `changeToCategoryGridView` - function that changes the layout of the category page to grid.
- `changeToCategoryListView` - function that changes the layout of the category page to a list.
- `changeToWishlistGridView` - function that changes the layout of the wishlist to grid.
- `changeToWishlistListView` - function that changes the layout of the wishlist to a list.
- `toggleFilterSidebar` - function that toggles the visibility of the filter sidebar.
- `toggleCartSidebar` - function that toggles the visibility of the cart modal.
- `isMobileMenuOpen` - boolean value that indicates whether the mobile menu is open.
- `isCartSidebarOpen` - boolean value that indicates whether the cart sidebar is open.
- `isWishlistSidebarOpen` - boolean value that indicates whether the wishlist sidebar is open.
- `isNewsletterModalOpen` - boolean value that indicates whether the newsletter modal is open.
- `isCategoryGridView` - boolean value that indicates whether the product list uses the grid layout.
- `isWishlistGridView` - boolean value that indicates whether the wishlist uses the grid layout.
- `isFilterSidebarOpen` - boolean value that indicates whether the filter sidebar is open.


## Interfaces

```ts
interface StateInterface {
  isCartSidebarOpen: boolean;
  isWishlistSidebarOpen: boolean;
  isLoginModalOpen: boolean;
  isNewsletterModalOpen: boolean;
  isCategoryGridView: boolean;
  isWishlistGridView: boolean;
  isFilterSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
}

interface UseUiStateInterface {
  isMobileMenuOpen: ComputedRef<boolean>;
  isCartSidebarOpen: ComputedRef<boolean>;
  isWishlistSidebarOpen: ComputedRef<boolean>;
  isLoginModalOpen: ComputedRef<boolean>;
  isNewsletterModalOpen: ComputedRef<boolean>;
  isCategoryGridView: ComputedRef<boolean>;
  isWishlistGridView: ComputedRef<boolean>;
  isFilterSidebarOpen: ComputedRef<boolean>;
  toggleMobileMenu(): void;
  toggleWishlistSidebar(): void;
  toggleLoginModal(): void;
  toggleNewsletterModal(): void;
  changeToCategoryGridView(): void;
  changeToCategoryListView(): void;
  changeToWishlistGridView(): void;
  changeToWishlistListView(): void;
  toggleFilterSidebar(): void;
  toggleCartSidebar(): void;
}
```

## Example

Bottom navigation example for mobile devices. It uses `useUiState` composable to toggle the visibility of the cart sidebar and the wishlist sidebar. It also uses `useUser` composable to check if the user is authenticated. If the user is authenticated, app navigates to the customer page. If the user is not authenticated, app toggles the login modal.

```ts
<template>
  <div class="smartphone-only">
    <SfBottomNavigation class="navigation-bottom">
      <SfBottomNavigationItem
        //...
        @click="handleHomeClick"
      >
        //...
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        v-if="isAuthenticated"
        //...
        @click="toggleWishlistSidebar"
      >
        //...
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        //...
        @click="handleAccountClick"
      >
        //...
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        //...
        @click="toggleCartSidebar"
      >
        //...
      </SfBottomNavigationItem>
    </SfBottomNavigation>
    <MobileCategorySidebar v-if="isMobileMenuOpen" />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useContext } from '@nuxtjs/composition-api';
import { useUiState, useUser } from '~/composables';

setup() {
  const router = useRouter();
  const { app } = useContext();
  const { isAuthenticated } = useUser();
  
  const { toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleMobileMenu,
    isMobileMenuOpen,
  } = useUiState();

  const handleHomeClick = async () => {
    const homePath = app.localeRoute({ name: 'home' });
    await router.push(homePath);

    if (isMobileMenuOpen.value) {
      toggleMobileMenu();
    }
  };

  const handleAccountClick = async () => {
    if (isAuthenticated.value) {
      await router.push(app.localeRoute({ name: 'customer' }));
    } else {
      toggleLoginModal();
    }
  };

  return {
    isMobileMenuOpen,
    toggleWishlistSidebar,
    toggleCartSidebar,
    toggleMobileMenu,
  }
}
</script>
```