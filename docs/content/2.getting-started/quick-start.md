# Quick start

Your Vue Storefront application has two parts:

1. **Server Middleware** - an Express.js application that can connect to your various third-party services (like Magento).


2. **Front-end application** - any application using JavaScript or TypeScript that can connect to the server middleware. Popular choices include [Nuxt](https://nuxt.com/) and [Next.js](https://nextjs.org/).

In this section, we will explain in a step-by-step guide how to use Magento 2 integration in each part of your Vue Storefront application.

:::read-more
Learn more about the Vue Storefront middleware layer in our [Key concepts: Middleware](../key-concepts/middleware.md) docs.
:::

:::read-more
Learn more about the SDK in our [Key concepts: SDK](../key-concepts/sdk.md) docs.
:::

## Prerequisites

- Magento configured - if you don't have your Magento 2 configured, see our [Magento Installation](./magento.md) guide.
- Install Node.js version >=16.0


## Server Middleware

The first step to setup your integration is to create and configure your server middleware layer to connect to your Magento 2 backend.

For an example of a generic server middleware configuration, check out one of [our boilerplates](https://github.com/vuestorefront/integration-boilerplate/tree/main/playground/middleware).

:::tip Already have the server middleware configured?
If you have the server middleware configured, you can move directly to the [SDK](./quick-start.md#sdk-preparation)[ preparation](./quick-start.md#sdk-preparation) part.
:::


1. Install the dependencies needed to create your server middleware and to create a server-to-server connection with the Magento 2 backend and the server middleware.

```bash
yarn add @vue-storefront/middleware @vue-storefront/magento-api 

# npm install @vue-storefront/middleware @vue-storefront/magento-api

# pnpm install @vue-storefront/middleware @vue-storefront/magento-api
```

2. Create a file `middleware.config.js` with server middleware configuration.

```javascript
// middleware.config.js

import {config} from "dotenv";

config();

const cookieNames = {
  currencyCookieName: 'vsf-currency',
  countryCookieName: 'vsf-country',
  localeCookieName: 'vsf-locale',
  cartCookieName: 'vsf-cart',
  customerCookieName: 'vsf-customer',
  storeCookieName: 'vsf-store',
  messageCookieName: 'vsf-message'
};

export const integrations = {
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
    }
};
```

3. Configure environment variables in your `.env` file.

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

4. Create a `middleware.js` file. This script is used to run the server middleware.

```javascript
// middleware.js

import {createServer} from "@vue-storefront/middleware";
import {integrations} from "./middleware.config.js";
import cors from 'cors';

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

5. Your middleware is ready. You can start it by running `node middleware.js`. Most likely, you'll want to setup this command as a script in your `package.json` file.

```json
{
  // ...
  "scripts": {
    "start": "node middleware.js"
  }
  // ...
}
```

## Configuring the SDK

Now, let's configure the SDK in the frontend part of your application to communicate with the server middleware. 

1. Install the SDK package and the Magento 2 module. These packages will allow you to create an instance of the SDK and then extend it with methods to communicate with Magento 2 via your server middleware.

```bash
yarn add @vue-storefront/sdk @vue-storefront/magento-sdk

# npm install @vue-storefront/sdk @vue-storefront/magento-sdk

# pnpm install @vue-storefront/sdk @vue-storefront/magento-sdk
```

2. Initialize the SDK. Configure Magento 2 module with `apiUrl` that points to the server middleware.

```ts
import { buildModule, initSDK } from '@vue-storefront/sdk';
import { magentoModule, MagentoModuleType } from '@vue-storefront/sdk/magento-sdk';

const sdkConfig = {
  magento: buildModule<MagentoModuleType>(magentoModule, { 
    apiUrl: 'http://localhost:8181/magento'
  })
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
```

3. Your SDK is ready! You can now import it in the different parts of your frontend application and call methods with `sdk.magento.<METHOD_NAME>`. To see a full list of methods offered by the Magento 2 module, check out the [API Reference](../reference/api/index.md).

For example, we can call the `products` method to fetch products from Magento 2.

```ts
import { sdk } from './sdk';
const products = await sdk.magento.products({})
// returns ProductInterface[]

```
