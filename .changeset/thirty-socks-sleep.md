---
"@vue-storefront/magento-api": major
---

- **[CHANGED]** `Endpoints` interface. Previously, each endpoint contained `context` param, which is internal and shouldn't be exposed in the final interface. Now, `Endpoints` interface properties don't contain `context` param. If you need to use `context` param, you should use `ApiMethods` type.

```diff
- import { Endpoints } from '@vue-storefront/magento-api';
+ import { ApiMethods } from '@vue-storefront/magento-api';
```

- **[CHANGED]** Removed `ContextualizedEndpoints` type. Use `Endpoints` instead.

```diff
- import { ContextualizedEndpoints } from '@vue-storefront/magento-api';
+ import { Endpoints } from '@vue-storefront/magento-api';
```
