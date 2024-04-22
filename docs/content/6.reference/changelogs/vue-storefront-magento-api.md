# @vue-storefront/magento-api

## 3.1.0

### Minor Changes

- 6dc90582: [CHANGED] Enhanced default GQL `productDetailsQuery` with new fields: `stock_status` and `only_x_left_in_stock`. [#1521](https://github.com/vuestorefront/magento2/pull/1521/files)

### Patch Changes

- 6672edfb: [CHANGED] Update TSDocs of API methods. Now, they contain examples of usage.

## 3.0.0

### Major Changes

- 8b8fdff0: - **[CHANGED]** `Endpoints` interface. Previously, each endpoint contained `context` param, which is internal and shouldn't be exposed in the final interface. Now, `Endpoints` interface properties don't contain `context` param. If you need to use `context` param, you should use `ApiMethods` type.

  ```diff
  - import { Endpoints } from '@vue-storefront/magento-api';
  + import { ApiMethods } from '@vue-storefront/magento-api';
  ```

  - **[CHANGED]** Removed `ContextualizedEndpoints` type. Use `Endpoints` instead.

  ```diff
  - import { ContextualizedEndpoints } from '@vue-storefront/magento-api';
  + import { Endpoints } from '@vue-storefront/magento-api';
  ```

  - **[REMOVED]** `MagentoApiMethods` interface. Use `Endpoints` instead.

  ```diff
  - import { MagentoApiMethods } from '@vue-storefront/magento-api';
  + import { Endpoints } from '@vue-storefront/magento-api';
  ```

## 2.7.0

### Minor Changes

- 8b2a0c35: [ADDED] `categories` endpoint that allows fetching a list of categories that match the specified filter.
  [CHANGED] `categoryList` endpoint is now deprecated in favor of the new `categories` endpoint.

  ```

  ```

### Patch Changes

- Updated dependencies [8b2a0c35]
  - @vue-storefront/magento-types@1.2.0

## 2.6.0

### Minor Changes

- 7ce4f9ed: **[CHANGED]** Enhanced default GQL queries

  - [`CategorySearchQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategorySearchQuery) new fields:
    - `url_key` - The url key assigned to the category.
    - `children` - Child categories tree.
      - `include_in_menu`
      - `is_anchor`
      - `level`
      - `name`
      - `position`
      - `product_count`
      - `uid`
      - `url_key`
      - `url_path`
      - `url_suffix`

  ```js
  // get category `children` categories

  const category = sdk.commerce.categorySearch();
  const children = category.children;
  ```

  - [`CategoryListQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategoryListQuery) new fields:
    - `children.url_key` - The url key assigned to the category.

  ```js
  // get `url_key` of category children

  const categoryList = sdk.commerce.categoryList();

  for (let categoryChildren of categoryList.children) {
    const url_key = categoryChildren.url_key;
  }
  ```

  - [`ProductListsQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ProductListsQuery) new fields:
    - `variants` - An array of variants of [`ConfigurableProduct`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ConfigurableProduct)

  ```js
  // get ConfigurableProduct `variants` products

  const products = sdk.commerce.products();

  for (let product of products) {
    if (product.__typename === "ConfigurableProduct") {
      const variants = products.variants;
    }
  }
  ```

### Patch Changes

- 7ce4f9ed: **[FIXED]** [`CategoryListQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategoryListQuery) returns `url_key` property on each children level

  **[CHANGED]** Enhanced default GQL queries

  - [`CategoryListQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategoryListQuery)
    - fetch up to 5th level nested categories `children`

- 7ce4f9ed: **[CHANGED]** Enhanced default GQL queries

  - [`ProductDetailsQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ProductDetailsQuery)
    - enhanced [`ConfigurableProduct`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ConfigurableProduct) response with [`ConfigurableVariants`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ConfigurableVariants)

- 7ce4f9ed: **[CHANGED]** Enhanced default GQL queries with new fields

  - [`CartQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CartQuery)
  - [`CustomerCartQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CustomerCartQuery)
  - [`ApplyCouponToCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ApplyCouponToCartMutation)
  - [`RemoveCouponFromCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/RemoveCouponFromCartMutation)
  - [`AddProductsToCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/AddProductsToCartMutation)
  - [`RemoveItemFromCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/RemoveItemFromCartMutation)
  - [`SetShippingMethodsOnCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/SetShippingMethodsOnCartMutation)
  - [`MergeCartsMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/MergeCartsMutation)

  with new fields:

  - `prices`
    - `subtotal_with_discount_excluding_tax`
  - `configured_variant`
    - `sku`
    - `name`
    - `only_x_left_in_stock`
    - `price_range`

- 7ce4f9ed: **[FIXED]** [`updateCustomerAddress`](https://docs.vuestorefront.io/integrations/magento/api/magento-api/updateCustomerAddress) method declaration argument type. Use `id` instead of `addressId`.

  **[CHANGED]** Enhanced default GQL queries

  - [`CreateCustomerAddress`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CreateCustomerAddress) response with fields
    - `firstname`
    - `lastname`
    - `prefix`
    - `suffix`

- 7ce4f9ed: **[CHANGED]** Enhanced default GQL queries with new fields

  - [`SetGuestEmailOnCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/SetBillingAddressOnCartMutation)
  - [`SetBillingAddressOnCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/SetBillingAddressOnCartMutation)
  - [`SetPaymentMethodOnCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/SetPaymentMethodOnCartMutation)
  - [`SetShippingAddressesOnCartMutation`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/SetShippingAddressesOnCartMutation)

  with new fields:

  - `prices`
    - `subtotal_with_discount_excluding_tax`
  - `configured_variant`
    - `sku`
    - `name`
    - `only_x_left_in_stock`
    - `price_range`

- Updated dependencies [7ce4f9ed]
- Updated dependencies [7ce4f9ed]
- Updated dependencies [7ce4f9ed]
- Updated dependencies [7ce4f9ed]
- Updated dependencies [7ce4f9ed]
- Updated dependencies [7ce4f9ed]
- Updated dependencies [7ce4f9ed]
  - @vue-storefront/magento-types@1.1.0

## 2.5.0

### Minor Changes

- eda02ee7: [CHANGED] Update addConfigurableProductsToCart and addBundleProductsToCart methods to align with the rest of the API methods. It is an internal change that does not affect the public API.

### Patch Changes

- 06362368: [CHANGED] `Context` from type to interface to allow declaration merging.

## 2.4.3

### Patch Changes

- adc748ef: \* Updated @apollo/client dependency from version `^3.6.9` to version `3.8.7` in the api-client package.
- adc748ef: \* Fixed a bug in the GraphQL mutation in the generateCustomerToken API. Replaced the ${generateCustomerToken} template string with ${generateCustomerTokenGQL.query} in the mutation to address the bug.

## 2.4.2

### Patch Changes

- Updated dependencies [045784a6]
  - @vue-storefront/magento-types@1.0.2

## 2.4.1

### Patch Changes

- 78edfd5c: \* Fixed a bug in the GraphQL mutation in the generateCustomerToken API. Replaced the ${generateCustomerToken} template string with ${generateCustomerTokenGQL.query} in the mutation to address the bug.

## 2.4.0

### Minor Changes

- d634cdbe: ## Changes

  This change adds support for custom queries in the `route` method of both the `api-client` and `sdk` modules. The `route` query has also been extended with a `CategoryInterface` fragment. These changes improve the flexibility and functionality of the `route` method, allowing for more customization and control over the data returned.

  ### api-client

  - Expanded the route query to include a `CategoryInterface` fragment.
  - Introduced support for `customQueries` within the route API method.

  ### sdk

  - Now includes support for `customQueries` in the route SDK method.

### Patch Changes

- 992734bf: ## Changes

  This change adds support for custom queries in the `generateCustomerToken` method of both the `api-client` and `sdk` modules.

  ### api-client

  - Introduced support for `customQueries` within the route API method.

  ### sdk

  - Now includes support for `customQueries` in the route SDK method.

## 2.3.0

### Minor Changes

- a9ea521f: Added Compatibility: Now supports domain-based store resolving with the [Unified MultiStore](https://github.com/vuestorefront/unified-multi-store) module.

## 2.2.0

### Minor Changes

- 07d2087a: Bumped `@vue-storefront/middleware` version to `^3.5.0` which introduces support for HTTP GET requests.

## 2.1.1

### Patch Changes

- Turn off query deduplication to prevent any potential session leaks.

## 2.1.0

### Minor Changes

- Add node 18 support

## 2.0.1

### Patch Changes

- Fix products and productDetails endpoints to return 200 instead of 500 when no products found
