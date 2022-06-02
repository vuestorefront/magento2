# Vue Storefront for Magento 1.0.0-rc.8 release notes

Vue Storefront for Magento 1.0.0.rc.8  contains backward-incompatible changes. To review these backward-incompatible changes, see

[1.0.0-rc.7 **Backward incompatible changes reference**](./rc.8-bic.md)

## Vue Storefront for Magento 1.0.0-rc.8 highlights

### Improved Customer Account Pages

Customer pages (my account) have been rewritten, and from now, each account page is a separate route.

### Improved code quality

All errors reported by the eslint have been fixed, and `lang=”ts”` attribute has been added to all vue templates. Missing types have been also added.

### New features

- feat: show configurable option values in order history AND feat: show more order details [#996](https://github.com/vuestorefront/magento2/pull/996)
- feat: add skeleton loaders for address edit and addresses details pages [#999](https://github.com/vuestorefront/magento2/pull/999)
- feat: add skeleton loaders in category navbar [#936](https://github.com/vuestorefront/magento2/pull/936)

### Performance improvements

- perf: make related and upsell products lazy loaded when visible [#981](https://github.com/vuestorefront/magento2/pull/981)
- perf: make read reviews loaded on request [#982](https://github.com/vuestorefront/magento2/pull/982)
- perf: make PDP Instagram feed section loaded when visible [#980](https://github.com/vuestorefront/magento2/pull/980)
- perf: make mobile store banner lazy-loaded on PDP [#979](https://github.com/vuestorefront/magento2/pull/979)
- perf: remove TopBar layout shift [#1034](https://github.com/vuestorefront/magento2/pull/1034)
- perf: prevent loading all main images on the mobile PDP gallery [#985](https://github.com/vuestorefront/magento2/pull/985)

### **Bugfix**

- fix: issue with displaying product price od PDP and PLP [#1053](https://github.com/vuestorefront/magento2/pull/1053)
- fix: empty wishlist implementation [#1006](https://github.com/vuestorefront/magento2/pull/1006)
- fix: fixed errors during wishlist loading [#995](https://github.com/vuestorefront/magento2/pull/995)
- fix: fetch new orders on each orders history visit AND move order information to separate section [#1046](https://github.com/vuestorefront/magento2/pull/1046)
- fix: remove unwanted authorization errors in the console [#976](https://github.com/vuestorefront/magento2/pull/976)
- fix: coupon code invalid error message [#1009](https://github.com/vuestorefront/magento2/pull/1009)
- fix: coupon code doesn't show error [#958](https://github.com/vuestorefront/magento2/pull/958)
- fix: prevent SfSidebar disableBodyScroll triggering on desktop [#1027](https://github.com/vuestorefront/magento2/pull/1027)
- fix: category page - equal amount of product for a row [#1007](https://github.com/vuestorefront/magento2/pull/1007)
- fix: wrong warning announcement on modal window to login [#1004](https://github.com/vuestorefront/magento2/pull/1004)
- fix: entities on filters are not displayed properly [#989](https://github.com/vuestorefront/magento2/pull/989)
- fix: add html content purify for the selected filters [#1039](https://github.com/vuestorefront/magento2/pull/1039)
- fix: useProductGallery reactivity [#1033](https://github.com/vuestorefront/magento2/pull/1033)
- fix: sfcontentpages style missing on my account develop [#992](https://github.com/vuestorefront/magento2/pull/992)
- fix: filter by category issue [#977](https://github.com/vuestorefront/magento2/pull/977)

### Refactors

- refactor!: moved customer pages to subroutes [#991](https://github.com/vuestorefront/magento2/pull/991)
- refactor!: create renderers for each product type [#1014](https://github.com/vuestorefront/magento2/pull/1014)
- refactor: updated order details totals section styling [#1042](https://github.com/vuestorefront/magento2/pull/988)
- refactor!: use order.number instead of deprecated order.order_number [#1000](https://github.com/vuestorefront/magento2/pull/1000)
- refactor: add product to cart from wishlist [#1026](https://github.com/vuestorefront/magento2/pull/1026)
- refactor: remove useless order getters [#1016](https://github.com/vuestorefront/magento2/pull/1016)
- refactor!: create wishlist module [#945](https://github.com/vuestorefront/magento2/pull/945)

### Tests

- test: added tests for cmscontent component [#1056](https://github.com/vuestorefront/magento2/pull/1056)
- test: categorynavbar component [#952](https://github.com/vuestorefront/magento2/pull/952)
- test: category-breadcrumbs component [#987](https://github.com/vuestorefront/magento2/pull/987)

### Chore

- chore: fix all remaining .vue lang="ts" errors [#1043](https://github.com/vuestorefront/magento2/pull/1043)
- refactor: fix eslint warnings in .vue files [#1036](https://github.com/vuestorefront/magento2/pull/1036)
- chore: implement overlooked additional tasks [#1023](https://github.com/vuestorefront/magento2/pull/1023)
- chore: fix all remaining eslint errors [#1010](https://github.com/vuestorefront/magento2/pull/1010)
- chore: fix ~50 eslint errors [#1008](https://github.com/vuestorefront/magento2/pull/1008)
- chore: fix ~240 eslint errors/warnings [#1005](https://github.com/vuestorefront/magento2/pull/1005)

### Documentation

- docs: update composables docs [#994](https://github.com/vuestorefront/magento2/pull/994)
- docs: refactor the setup guide docs [#975](https://github.com/vuestorefront/magento2/pull/975)
- docs: update useAddresses API reference [#935](https://github.com/vuestorefront/magento2/pull/935)
