# @vue-storefront/magento-sdk

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
