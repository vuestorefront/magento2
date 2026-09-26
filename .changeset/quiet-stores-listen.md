---
"@vue-storefront/magento-api": patch
---

**[FIXED]** `customHeaders` passed to an API method now override the `store`, `Authorization` and `Content-Currency` headers taken from the request cookies. Before, the Apollo link re-applied the cookie values after `customHeaders`, so a caller could not switch the store view, customer token or currency for a single request while the matching cookie was set.
