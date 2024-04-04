---
"@vue-storefront/magento-api": patch
"@vue-storefront/magento-types": patch
---

**[CHANGED]** Enhanced default GQL queries with new fields

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
