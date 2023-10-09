---
"@vue-storefront/magento-api": minor
"@vue-storefront/magento-sdk": minor
---

## Changes

This change adds support for custom queries in the `route` method of both the `api-client` and `sdk` modules. The `route` query has also been extended with a `CategoryInterface` fragment. These changes improve the flexibility and functionality of the `route` method, allowing for more customization and control over the data returned.

### api-client

- Expanded the route query to include a `CategoryInterface` fragment.
- Introduced support for `customQueries` within the route API method.

### sdk

- Now includes support for `customQueries` in the route SDK method.


