---
"@vue-storefront/magento-sdk": patch
---

### Change Log

- [CHANGED] Deprecated the `MagentoModuleType` interface in `index.ts`. It is no longer necessary to use this type. Please, check documentation of `magentoModule` for alternatives. Below you can find a snippet of the new way of using `magentoModule`. Pay attention to the `buildModule` function that is used to create a module instance, it no longer requires the `MagentoModuleType` type as a generic parameter.

```ts
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { magentoModule, MagentoModuleType } from '@vue-storefront/magento2-sdk'

const sdkConfig = {
  magento:
    buildModule(
      magentoModule,
      {
        apiUrl: 'http://localhost:8181/magento',
      }
    )
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
```

- [CHANGED] Made the `ssrApiUrl` property in `ModuleOptions.ts` optional.
