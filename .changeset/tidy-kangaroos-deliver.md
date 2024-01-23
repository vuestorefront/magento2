---
"@vue-storefront/magento-api": minor
"@vue-storefront/magento-types": minor
---

**[CHANGED]** Enhanced default GQL queries

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
