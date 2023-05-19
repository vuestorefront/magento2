# Quick start

## Prerequisites

- Magento configured - if you don't have your Magento2 configured, see our [Configuration](https://docs.vuestorefront.io/magento/installation-setup/installation.html) guide.
- Install Node.js version 16.0

## Using the integration

In this section, we will explain in a step-by-step guide how to use Magento2 integration in your front-end application.

### Middleware preparation

:::tip Key concept - Middleware
Middleware concept is described in detail in our [Key concepts: Middleware](../key-concepts/middleware.md) docs.
:::

:::tip Already have the server middleware configured?
If you have the server middleware configured, you can move directly to the [SDK](./quick-start.md#sdk-preparation)[ preparation](./quick-start.md#sdk-preparation) part.
:::

1. Install the API Client to communicate with SAP Customer Cloud. This package is used to create a server-to-server connection with the SAP Commerce Cloud backend and the server middleware.

```bash
yarn add @vue-storefront/magento-api
```

2. Install `@vue-storefront/middleware` package. This package is used to create the server middleware.

```bash
yarn add @vue-storefront/middleware
```

3. Create a file `middleware.config.js` with server middleware configuration.

```javascript
// middleware.config.js

require('dotenv').config();

module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: process.env.VSF_MAGENTO_GRAPHQL_URL,
        cookies: {
          ...cookieNames,
        },
        cookiesDefaultOpts: {
          httpOnly: process.env.VSF_COOKIE_HTTP_ONLY || false,
          secure: process.env.VSF_COOKIE_SECURE || false,
          sameSite: process.env.VSF_COOKIE_SAME_SITE || 'lax',
          path: process.env.VSF_COOKIE_PATH || '/',
        },
        defaultStore: 'default',
        externalCheckout: {
          enable: isCheckoutEnabled,
          cmsUrl: process.env.VSF_MAGENTO_EXTERNAL_CHECKOUT_URL,
          syncUrlPath: process.env.VSF_MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH,
          stores: {
            default: isCheckoutEnabled,
          },
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: true,
        },
        magentoBaseUrl: process.env.VSF_MAGENTO_BASE_URL,
        magentoApiEndpoint: process.env.VSF_MAGENTO_GRAPHQL_URL,
        imageProvider: process.env.NUXT_IMAGE_PROVIDER,
        recaptcha: {
          isEnabled: process.env.VSF_RECAPTCHA_ENABLED === 'true',
          sitekey: process.env.VSF_RECAPTCHA_SITE_KEY,
          secretkey: process.env.VSF_RECAPTCHA_SECRET_KEY,
          version: process.env.VSF_RECAPTCHA_VERSION,
          score: process.env.VSF_RECAPTCHA_MIN_SCORE,
        },
        customer: {
          customer_create_account_confirm: true,
        },
      },
    },
  },
};
```

4. Configure environment variables in your `.env` file.

```
# .env

VSF_NUXT_APP_ENV=production
VSF_NUXT_APP_PORT=3000
VSF_NUXT_APP_HOST=0.0.0.0

VSF_STORE_URL=
API_BASE_URL=
API_SSR_BASE_URL=

VSF_MAGENTO_BASE_URL=
VSF_MAGENTO_GRAPHQL_URL=

NUXT_IMAGE_PROVIDER=ipx
```

5. Create a `middleware.js` file. This script is used to run the server middleware.

```javascript
// middleware.js

const { createServer } = require("@vue-storefront/middleware");
const { integrations } = require("./middleware.config");
const cors = require("cors");

(async () => {
  const app = await createServer({ integrations });
  const host = process.argv[2] ?? "0.0.0.0";
  const port = process.argv[3] ?? 8181;
  const CORS_MIDDLEWARE_NAME = "corsMiddleware";

  const corsMiddleware = app._router.stack.find(
    (middleware) => middleware.name === CORS_MIDDLEWARE_NAME
  );

  corsMiddleware.handle = cors({
    origin: [
      "http://localhost:3000",
      ...(process.env.MIDDLEWARE_ALLOWED_ORIGINS?.split(",") ?? []),
    ],
    credentials: true,
  });

  app.listen(port, host, () => {
    console.log(`Middleware started: ${host}:${port}`);
  });
})();

```

6. Your middleware is ready. You can start it by running `node middleware.js`

### SDK preparation

:::tip Key concept - SDK
SDK is described in detail in our [Key concepts: SDK](../key-concepts/sdk.md) docs.
:::

1. Install the SDK package. It's the core of the SDK.

```bash
yarn add @vue-storefront/sdk
```

2. Install the SAP Commerce Cloud module. It extends the SDK core with methods to communicate with SAP Commerce Cloud.

```bash
yarn add @vue-storefront/sapcc-sdk
```

3. Initialize the SDK. Configure SAP Commerce Cloud module with `apiUrl` that points to the server middleware.

```javascript
import { buildModule, initSDK } from '@vue-storefront/sdk';
import { magentoModule } from '../../../src';

const sdkConfig = {
  magento: buildModule(magentoModule,
    {
      apiUrl: 'http://localhost:8181/magento'
    })
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
```

4. Your SDK is ready and you can call methods with `sdk.magento.<METHOD_NAME>`. To see a full list of methods offered by the Magento2 module, check out the [API Reference](../reference/api/index.md).
