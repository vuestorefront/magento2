# @vue-storefront/magento-sdk

## 2.3.2

### Patch Changes

- 6672edfb: [CHANGED] `magentoModule` has been deprecated. Use `middlewareModule` from `@vue-storefront/sdk` package instead.

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

## 2.3.1

### Patch Changes

- ae8a741d: ### Change Log

  - [CHANGED] Deprecated the `MagentoModuleType` interface in `index.ts`. It is no longer necessary to use this type. Please, check documentation of `magentoModule` for alternatives. Below you can find a snippet of the new way of using `magentoModule`. Pay attention to the `buildModule` function that is used to create a module instance, it no longer requires the `MagentoModuleType` type as a generic parameter.

  ```ts
  import { initSDK, buildModule } from "@vue-storefront/sdk";
  import {
    magentoModule,
    MagentoModuleType,
  } from "@vue-storefront/magento2-sdk";

  const sdkConfig = {
    magento: buildModule(magentoModule, {
      apiUrl: "http://localhost:8181/magento",
    }),
  };

  export const sdk = initSDK(sdkConfig);
  ```

  - [CHANGED] Made the `ssrApiUrl` property in `ModuleOptions.ts` optional.

## 2.3.0

### Minor Changes

- 8b2a0c35: [ADDED] `categories` method that allows fetching a list of categories that match the specified filter.

### Patch Changes

- Updated dependencies [8b2a0c35]
  - @vue-storefront/magento-types@1.2.0

## 2.2.0

### Minor Changes

- eda02ee7: [ADDED] addBundleProductsToCart method to add one or more bundle products to the specified cart.
  [ADDED] addConfigurableProductsToCart method to add one or more configurable products to the specified cart.

## 2.1.1

### Patch Changes

- c5d63066: [FIXED] Correctly passing properties and options to `customQuery` and `customMutation` SDK methods. Previously, the `customHeaders` option was not being passed properly. Now, all options will be properly passed to the `customQuery` and `customMutation` methods.

## 2.1.0

### Minor Changes

- d634cdbe: ## Changes

  This change adds support for custom queries in the `route` method of both the `api-client` and `sdk` modules. The `route` query has also been extended with a `CategoryInterface` fragment. These changes improve the flexibility and functionality of the `route` method, allowing for more customization and control over the data returned.

  ### api-client

  - Expanded the route query to include a `CategoryInterface` fragment.
  - Introduced support for `customQueries` within the route API method.

  ### sdk

  - Now includes support for `customQueries` in the route SDK method.

### Patch Changes

- 992734bf: ## Changes

  This change adds support for custom queries in the `generateCustomerToken` method of both the `api-client` and `sdk` modules.

  ### api-client

  - Introduced support for `customQueries` within the route API method.

  ### sdk

  - Now includes support for `customQueries` in the route SDK method.

## 2.0.0

### Major Changes

- 07d2087a: Implemented `@vue-storefront/sdk-axios-request-sender` package in all SDK methods. Also, `availableStores`, `categoryList`, `categorySearch`, `cmsBlocks`, `cmsPage`, `countries`, `currency`, `productDetails`, `productReview`, `productReviewRatingsMetadata`, `products`, `relatedProducts`, `reviews`, `route`, `storeConfig`, `upsellProducts` methods now send GET instead of POST requests to Vue Storefront's Server Middleware.

### Minor Changes

- 37432dc8: ### Enhancements:

  - Exported method types from the Magento SDK, providing improved accessibility and clarity for developers using the SDK.

  ### Dependency Updates:

  - Updated TypeScript to version 5.2.2, ensuring compatibility with the latest TypeScript features and improvements.

## 1.1.0

### Minor Changes

- Add node 18 support
