# Vue Storefront for Magento 1.0.0-rc.7 release notes

Vue Storefront for Magento 1.0.0.rc.7  contains backward-incompatible changes. To review these backward-incompatible changes, see

[1.0.0-rc.7 **Backward incompatible changes reference**](./rc.7-bic.md)

## Vue Storefront for Magento 1.0.0-rc.7 highlights

### Refactoring of composables

In this version, the integration packages `@vue-storefront/magento` has been marked as deprecated. All things from this package, including composables, getters, and helpers have been moved to `@vue-storefront/magento-theme`

**All composables have been refactored and moved to the theme.**

- SharedRefs are not used anymore.
  - from now we use the Pinia store for global state management
  - instead of sharing context between each composables we use the useContext hook from Nuxt Composition API
  - factories have been removed, and from now each composable is a function without dependencies on the `@vue-storefront/core` package


**Getters have been moved to the theme package and marked as deprecated.**

In the next releases, getters will be removed.

**Helpers have been moved to the theme package**

### The onSSR hook is not used anymore

From now, each operation that should be performed on the server-side must be called inside on the `useFetch` and the `useAsync` functions that are part of **Nuxt Composition API**.

### The i18n plugin is not used anymore

The i18n plugin from `@vue-storefront/core` is not used anymore. Configuring i18n is the responsibility of the theme package from now.

### Modularization

We started the process of split whole app into modules. The first module is the category module that contains components and logic responsible for catalog category pages. In next releases we will continue refactorization and add modules for other parts of app like product, checkout, account, wishlist and so on.

### New features

- Breadcrumbs on Category pages [#819](https://github.com/vuestorefront/magento2/pull/819)
- Loading skeletons: [#681](https://github.com/vuestorefront/magento2/pull/681)
- Styles for default Magento Static Blocks that appear on Category Landing Pages: [#685](https://github.com/vuestorefront/magento2/pull/685)
- Added possibility to navigate to nested categories in the mobile side menu [#709](https://github.com/vuestorefront/magento2/pull/709)
- Added information about selected filters in the filters sidebar [#830](https://github.com/vuestorefront/magento2/pull/830)
- Display category title below breadcrumbs [#892](https://github.com/vuestorefront/magento2/pull/892)
- Added mega menu on desktop view [#903](https://github.com/vuestorefront/magento2/pull/903)

### Performance improvements

- From now, user data is loaded only on pages where it’s necessary like checkout and my account pages. In other cases, user data is not loading and thanks to that the performance on mobile is better because we decreased the time of JS long tasks. https://github.com/vuestorefront/magento2/pull/859
- We added the storeConfig plugin and changed the approach to getting config from Magento. [#862](https://github.com/vuestorefront/magento2/pull/862)
  - before we loaded the whole Magento config on page load, and we did that in layout so it was not possible to change the use different layout than the default
  - after this change, we load only a few necessary fields by the Nuxt plugin.
  - Thanks to that it’s possible to use other layouts like default. Moreover, this has an impact on performance because the storeConfig Magento query is not cached on the Magento side, so when we decreased the amount of data, the time of response should be faster.
- Once we updated the Storefront UI to the newest version, we were able to add support for the NuxtImage for images in the Gallery on ta Product Page [#850](https://github.com/vuestorefront/magento2/pull/850)

### **Bugfix**

- color swatches are visible on the product page on a mobile device so from now it’s possible to add a configurable product to the cart on mobile devices. [#926](https://github.com/vuestorefront/magento2/pull/926)
- Wishlist and cart transition works correctly from now when a user opens the wishlist sidebar or cart sidebar [#918](https://github.com/vuestorefront/magento2/pull/918)
- Once the message about the not authorized user is displayed, the cookie with a message will be removed to avoid displaying the message endlessly. [#775](https://github.com/vuestorefront/magento2/pull/775)
- From now, it’s possible to add more than one product to the cart from the Category page in list mode [#680](https://github.com/vuestorefront/magento2/pull/680)
- The “your bag is empty” phrase is centered correctly from now [#679](https://github.com/vuestorefront/magento2/pull/679)
- updated the useUser composable to assign error values for an email update action [#777](https://github.com/vuestorefront/magento2/pull/777)
- removed redundant form handling requests to avoid duplicated/multiplicated requests [#777](https://github.com/vuestorefront/magento2/pull/777)
- fixed 404-page issues and my-account redirects for non-logged users [#722](https://github.com/vuestorefront/magento2/pull/722)
- fixed price caching issue on category page [#793](https://github.com/vuestorefront/magento2/pull/793)
- fallow one digit house numbers [#824](https://github.com/vuestorefront/magento2/pull/824)
- The billing address is no longer cleared while returning to the billing step on checkout [#783](https://github.com/vuestorefront/magento2/pull/783)
- removed placeholder for a sorting mechanism in the category navbar [#782](https://github.com/vuestorefront/magento2/pull/782)
- fixed wrong direction of the draggable icon on the product page (mobile) [#927](https://github.com/vuestorefront/magento2/pull/927)
- Click on a product tab click to scroll to tab content from now [#931](https://github.com/vuestorefront/magento2/pull/931)
- Prevented content jump when an option or variant is selected [#933](https://github.com/vuestorefront/magento2/pull/933)

### Refactors

- Removed categoryGetters call from AppHeader.vue [#853](https://github.com/vuestorefront/magento2/pull/853)
- Removed storeConfigGetters and storeGetters from StoreSwitcher and StoresModal
- Removed categoryGetters from SearchBar.vue
- Removed category results from the Search results components [#867](https://github.com/vuestorefront/magento2/pull/867)
- Created the category module and refactored the category three components
- refactored Category page’s filters on desktop view [#815](https://github.com/vuestorefront/magento2/pull/815)
- refactored store switcher [#794](https://github.com/vuestorefront/magento2/pull/794)
- refactored cookie retrieval [#797](https://github.com/vuestorefront/magento2/pull/797)
- removed links from order's product [#778](https://github.com/vuestorefront/magento2/pull/778)
- Moved filters to sidebar on desktop view [#884](https://github.com/vuestorefront/magento2/pull/884)
- Created Grid/list components on Category page [#910](https://github.com/vuestorefront/magento2/pull/910)
- Refactored project config & env variables [#813](https://github.com/vuestorefront/magento2/pull/813)
- refactored useUiState [#595](https://github.com/vuestorefront/magento2/pull/595)
- changed homepage slider to the hero section [#928](https://github.com/vuestorefront/magento2/pull/928)
- changed products carousel on the home page to non-carousel section [#914](https://github.com/vuestorefront/magento2/pull/914)
- added skeleton loaders in category nabvar [#936](https://github.com/vuestorefront/magento2/pull/936)

### Chore

- Updated StorefrontUI to 0.13.0 [#781](https://github.com/vuestorefront/magento2/pull/781)
- Updated @vue-storefront packages to 2.5.6 [#740](https://github.com/vuestorefront/magento2/pull/740)
- fixed .lintstagedrc {.vue} warning [#779](https://github.com/vuestorefront/magento2/pull/779)
- lint-staged should run only once [#789](https://github.com/vuestorefront/magento2/pull/789)
- auto-assign team members to pull requests [#759](https://github.com/vuestorefront/magento2/pull/759)
- removed commitizen prepare-commit-msg git hook [#780](https://github.com/vuestorefront/magento2/pull/780)
- Merged the three .lintstagedrc regexes into one [#787](https://github.com/vuestorefront/magento2/pull/787)

### Documentation

- documentation about composables has been fully rewrote
- added documentation for API Client methods
