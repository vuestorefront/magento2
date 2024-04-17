---
"@vue-storefront/magento-sdk": patch
---

[CHANGED] `magentoModule` has been deprecated. Use `middlewareModule` from `@vue-storefront/sdk` package instead.

```diff
- import { initSDK, buildModule } from '@vue-storefront/sdk';
- import { magentoModule } from '@vsf-enterprise/magento-sdk'
+ import { initSDK, buildModule, middlewareModule } from '@vue-storefront/sdk';
+ import { Endpoints as MagentoEndpoints } from '@vsf-enterprise/sapcc-api'; // In Alokai Storefront you should import it from `storefront-middleware/types.ts`

const sdkConfig = {
  magento:
    buildModule(
-      magentoModule,
+      middlewareModule<MagentoEndpoints>,
      { apiUrl: 'http://localhost:8181/magento' }
    )
};
```

Updating your `magentoModule` to this version should not disrupt your existing code; however, switching to `middlewareModule` will require certain modifications.

To migrate:

- Use custom query as a second argument of `middlewareModule` function.

```diff
const customQuery = {
  cart: 'cart-custom-query',
  metadata: {
    fields: 'id items { uid }'
  }
};
- const cart = await sdk.magento.cart({ cartId: '123'}, { customQuery });
+ const cart = await sdk.magento.cart({ cartId: '123'}, customQuery);
```
