---
"@vue-storefront/magento-api": patch
"@vue-storefront/magento-types": patch
---

**[CHANGED]** Enhanced default GQL queries with new fields

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
