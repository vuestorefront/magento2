---
"@vue-storefront/magento-api": minor
"@vue-storefront/magento-types": minor
---

**[CHANGED]** Enhanced default GQL queries

- [`CategorySearchQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategorySearchQuery) new fields:
  - `url_key` - The url key assigned to the category.
  - `children` - Child categories tree.
- [`CategoryListQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategoryListQuery) new fields:
  - `url_key` - The url key assigned to the category.
- [`ProductListsQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ProductListsQuery) new fields:
  - `variants` - An array of variants of [`ConfigurableProduct`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/ConfigurableProduct)
