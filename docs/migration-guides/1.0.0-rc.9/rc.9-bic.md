# 1.0.0-rc.9 Backward incompatible changes reference

In this document, you can see crucial breaking changes in the `1.0.0-rc.9` comparing to `1.0.0-rc.8` release. To see all changes, please take a look at the [release pull request](https://github.com/vuestorefront/magento2/pull/1110)

## Theme

| File                                                                   | what and how it changed                                                                                            |
|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| packages/theme/components/Checkout/VsfPaymentProvider.vue              | names of variables have been changed                                                                               |
| packages/theme/components/LoginModal.vue                               | The file has been moved to packages/theme/modules/customer/components/LoginModal/LoginModal.vue                    |
| packages/theme/components/NewProducts.vue                              | :is-added-to-cart event argument has been changed                                                                  |
| packages/theme/composables/useApi/index.ts                             | From now the useApi use methods from ApiClient (customQuery, customMutation) to communicate with Magento API       |
| packages/theme/composables/useUrlResolver/index.ts                     | changed GraphQL query to the route query                                                                           |
| packages/theme/modules/catalog/category/stores/category.ts             | from now it uses API client to fetch data instead of graphql plugin                                                |
| packages/theme/modules/catalog/pages/category.vue                      | SfPagination is replaced by the new CategoryPagination components, values of props and variables have been changed |
| All *.gql.ts files in the theme package                                | changed the `gql` dependency import from graphq-request to graphql-tag                                             |
| packages/theme/modules/catalog/product/components/ProductsCarousel.vue | :is-added-to-cart event argument has been changed                                                                  |
| packages/theme/modules/customer/getters/userShippingGetters.ts         | getters names have been changed                                                                                    |
| packages/theme/modules/customer/pages/MyAccount/MyWishlist.vue         | :is-added-to-cart event argument has been changed                                                                  |
| packages/theme/nuxt.config.js                                          | GraphQL plugin has been removed                                                                                    |
| packages/theme/plugins/storeConfigPlugin.ts                            | from now it uses API client to fetch data instead of graphql plugin                                                |
