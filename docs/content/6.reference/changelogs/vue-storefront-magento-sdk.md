# @vue-storefront/magento-sdk

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
