---
"@vue-storefront/magento-api": minor
---

**[ADDED]** `cookieOptions` config. This option allows you to customize the cookie options which are set for a given cookie name.

Example:
```
{
  integrations: {
    magento: {
      location: "@vue-storefront/magento-api/server",
      configuration: {
        // ...
        cookieOptions: {
          "vsf-customer": {
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          }
        }
      },
    },
  },
}
```
