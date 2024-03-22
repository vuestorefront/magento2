---
"@vue-storefront/magento-api": patch
"@vue-storefront/magento-types": patch
---

**[FIXED]** [`updateCustomerAddress`](https://docs.vuestorefront.io/integrations/magento/api/magento-api/updateCustomerAddress) method declaration argument type. Use `id` instead of `addressId`.

**[CHANGED]** Enhanced default GQL queries

- [`CreateCustomerAddress`](https://docs.vuestorefront.io/integrations/magento/api/magento-types/CreateCustomerAddress) response with fields
  - `firstname`
  - `lastname`
  - `prefix`
  - `suffix`
