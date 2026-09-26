---
"@vue-storefront/magento-sdk": patch
---

**[FIXED]** `magentoModule` now stores the `ssrApiUrl` option, so server-side requests go to `ssrApiUrl` as documented. Before, the connector only stored `apiUrl`, so `ssrApiUrl` was ignored and server-side rendering always called `apiUrl`.
