# @vue-storefront/magento-types

## 2.0.0

### Major Changes

- e4709f9a: Changed minimum Node version from 16 to 18. The condition that was forcing the Node version to be lower than 19 is also removed.

## 1.2.0

### Minor Changes

- 8b2a0c35: [ADDED] `categories` endpoint definition.

## 1.1.0

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

- 7ce4f9ed: **[FIXED]** [`getAvailableShippingMethods`](https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableShippingMethods) method declaration argument type. Using `cart_id` instead of `cartId`.
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

## 1.0.2

### Patch Changes

- 045784a6: Fixes
  - Fixed `getAvailablePaymentMethods` type definition. Parameter `cartId` is now properly typed as `string`.

## 1.0.1

### Patch Changes

- [#1456](https://github.com/vuestorefront/magento2/pull/1456) [`e3f329ec`](https://github.com/vuestorefront/magento2/commit/e3f329ec815be7477d398277c98333c3e66e2d65) Thanks [@bartoszherba](https://github.com/bartoszherba)! - Fixed a Naming Issue in productDetails Method

  We've fixed a problem where the method name used to access product details was mistakenly written as "productDetail." It's now correctly named as "productDetails." This change ensures everything is clear and accurate in the code.
