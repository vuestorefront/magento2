---
"@vue-storefront/magento-api": patch
---

* Fixed a bug in the GraphQL mutation in the generateCustomerToken API. Replaced the ${generateCustomerToken} template string with ${generateCustomerTokenGQL.query} in the mutation to address the bug.
