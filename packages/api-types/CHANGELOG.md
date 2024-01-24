# @vue-storefront/magento-types

## 1.1.0

### Minor Changes

- e3a461c9: **[CHANGED]** Enhanced default GQL queries

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

## 1.0.2

### Patch Changes

- 045784a6: Fixes
  - Fixed `getAvailablePaymentMethods` type definition. Parameter `cartId` is now properly typed as `string`.

## 1.0.1

### Patch Changes

- [#1456](https://github.com/vuestorefront/magento2/pull/1456) [`e3f329ec`](https://github.com/vuestorefront/magento2/commit/e3f329ec815be7477d398277c98333c3e66e2d65) Thanks [@bartoszherba](https://github.com/bartoszherba)! - Fixed a Naming Issue in productDetails Method

  We've fixed a problem where the method name used to access product details was mistakenly written as "productDetail." It's now correctly named as "productDetails." This change ensures everything is clear and accurate in the code.
