---
"@vue-storefront/magento-api": patch
"@vue-storefront/magento-types": patch
---

**[FIXED]** [`CategoryListQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategoryListQuery) returns `url_key` property on each children level

**[CHANGED]** Enhanced default GQL queries

- [`CategoryListQuery`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CategoryListQuery)
  - fetch up to 5th level nested categories `children`
