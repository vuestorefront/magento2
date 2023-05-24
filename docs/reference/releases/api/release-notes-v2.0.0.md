# Release notes for v2.0.0

This is the stable release of the `2.0.0` version of the `@vue-storefront/magento-api` package.

In this release we:

- updated the API package to be compatible with the `v1.0.0` of the `@vue-storefront/magento-sdk` package
- moved shared types to the `@vue-storefront/magento-api-types` package
- renamed few endpoints to be more consistent with the Magento API naming convention
  - `upsellProduct` -> `upsellProducts`
  - `relatedProduct` -> `relatedProducts`
  - `productDetail` -> `productDetails`
- `customerProductReview` is deprecated and replaced with `reviews` endpoint. The `customerProductReview` will be removed in the next major release.
- each endpoint will now use raw query string instead of the `query` object. It will improve the consistency of the API and will increase the payload readability.
