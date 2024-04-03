---
"@vue-storefront/magento-sdk": patch
---

[FIXED] Correctly passing properties and options to `customQuery` and `customMutation` SDK methods. Previously, the `customHeaders` option was not being passed properly. Now, all options will be properly passed to the `customQuery` and `customMutation` methods.
