# @vue-storefront/magento-api

## 2.4.1

### Patch Changes

- 78edfd5c: \* Fixed a bug in the GraphQL mutation in the generateCustomerToken API. Replaced the ${generateCustomerToken} template string with ${generateCustomerTokenGQL.query} in the mutation to address the bug.

## 2.4.0

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

## 2.3.0

### Minor Changes

- a9ea521f: Added Compatibility: Now supports domain-based store resolving with the [Unified MultiStore](https://github.com/vuestorefront/unified-multi-store) module.

## 2.2.0

### Minor Changes

- 07d2087a: Bumped `@vue-storefront/middleware` version to `^3.5.0` which introduces support for HTTP GET requests.

## 2.1.1

### Patch Changes

- Turn off query deduplication to prevent any potential session leaks.

## 2.1.0

### Minor Changes

- Add node 18 support

## 2.0.1

### Patch Changes

- Fix products and productDetails endpoints to return 200 instead of 500 when no products found
