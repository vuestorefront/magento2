# Vue Storefront for Magento 1.0.0-rc.9 release notes

Vue Storefront for Magento 1.0.0.rc.9 contains backward-incompatible changes. To review these backward-incompatible changes, see

[1.0.0-rc.9 **Backward incompatible changes reference**](./rc.9-bic.md)

## Vue Storefront for Magento 1.0.0-rc.9 highlights

### New f**eatures**

- feat: added productSkeleton component [#1097](https://github.com/vuestorefront/magento2/pull/1097)
- feat: add configurable filters [#1060](https://github.com/vuestorefront/magento2/pull/1060)

### **Bugfix**

- fix!: search bar not returning results [#1087](https://github.com/vuestorefront/magento2/pull/1087)
- fix: total price and discount calculation [#1090](https://github.com/vuestorefront/magento2/pull/1090)
- fix: removed filters skeleton on mobile devices [#1100](https://github.com/vuestorefront/magento2/pull/1100)
- fix: category page filters are taken off after using pagination [#1093](https://github.com/vuestorefront/magento2/pull/1093)
- fix: bundle product option change special price calculation
- fix: grouped product special price calculation [#1069](https://github.com/vuestorefront/magento2/pull/1069)
- fix: category page header invalid title
- fix: disable body scroll lock [#1059](https://github.com/vuestorefront/magento2/pull/1059)
- fix: fetch new orders on each orders history visit AND move order information to separate section [#1046](https://github.com/vuestorefront/magento2/pull/1046)

### Refactors

- refactor!: refactor the useApi composable [#1104](https://github.com/vuestorefront/magento2/pull/1107 https://github.com/vuestorefront/magento2/pull/1104)
- refactor: make unit tests typing work even when theme is moved to template-magento [#1091](https://github.com/vuestorefront/magento2/pull/1091)
- refactor: remove some instances of implicit any [#1066](https://github.com/vuestorefront/magento2/pull/1066)
- refactor: double-check types in composables [#1085](https://github.com/vuestorefront/magento2/pull/1085)
- refactor!: refactored useUrlResolver to use the route query [#1078](https://github.com/vuestorefront/magento2/pull/1078)
- refactor!: break down login modal into separate components [#1095](https://github.com/vuestorefront/magento2/pull/1095)
- refactor: use null instead of {} [#1068](https://github.com/vuestorefront/magento2/pull/1068)
- refactor: improve typing of sorting in facetGetters/category.vue [#1080](https://github.com/vuestorefront/magento2/pull/1080)
- refactor: add interface for useProductsWithCommonCardProps [#1086](https://github.com/vuestorefront/magento2/pull/1086)
- refactor: remove a few more instances of implicit any [#1071](https://github.com/vuestorefront/magento2/pull/1071)
- refactor: add types for HeaderNavigation*.vue components [#1079](https://github.com/vuestorefront/magento2/pull/1079)
- refactor!: add typing for VsfPaymentProvider.vue [#1077](https://github.com/vuestorefront/magento2/pull/1077)
- refactor: connection to api refactor [https://github.com/vuestorefront/magento2/pull/1101](https://github.com/vuestorefront/magento2/pull/1101)
- refactor: remove useless function [#1083](https://github.com/vuestorefront/magento2/pull/1083)
- refactor: fixed customer logging and authorization checking [#1081](https://github.com/vuestorefront/magento2/pull/1081)
- refactor: resolve all todos [#1064](https://github.com/vuestorefront/magento2/pull/1064)

### Tests

- test: added tests for selectedfilters component [#1067](https://github.com/vuestorefront/magento2/pull/1067)
- test: add tests for filter renderers [#1065](https://github.com/vuestorefront/magento2/pull/1065)
- test: added tests for categoryfilters component [#1076](https://github.com/vuestorefront/magento2/pull/1076)
- test: added tests for category sidebar component [#1028](https://github.com/vuestorefront/magento2/pull/1028)
- test: add CategorySidebar tests [#1103](https://github.com/vuestorefront/magento2/pull/1103)

### Chore

- chore: fix all remaining .vue lang="ts" errors [#1043](https://github.com/vuestorefront/magento2/pull/1043)
- chore: updated contributors list [#1074](https://github.com/vuestorefront/magento2/pull/1074)

### Documentation

- docs: added documentation about global state management [#1072](https://github.com/vuestorefront/magento2/pull/1072)
- docs: add catalog module documentation [#1082](https://github.com/vuestorefront/magento2/pull/1082)
- docs: fix typos in Composables document [#1102](https://github.com/vuestorefront/magento2/pull/1102)
- docs: new Installation document and image optimization [#1084](https://github.com/vuestorefront/magento2/pull/1084)
- docs: add composables docs [#1062](https://github.com/vuestorefront/magento2/pull/1062)
