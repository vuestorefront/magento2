<div align="center">
<img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" height="80px"/>  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magento_Logo.svg/2560px-Magento_Logo.svg.png" height="80px"/>
</div>


### Stay connected

![GitHub Repo stars](https://img.shields.io/github/stars/vuestorefront/vue-storefront?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/vuestorefront?style=social)
![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCkm1F3Cglty3CE1QwKQUhhg?style=social)
[![Discord](https://img.shields.io/discord/770285988244750366?label=join%20discord&logo=Discord&logoColor=white)](https://discord.vuestorefront.io)



**This repository contains integration for Magento 2 and Vue Storefront Middleware.**
This integration is framework-agnostic and may be consumed in the framework of your choice.

## Magento 2 integration for Vue Storefront

This project is a Magento 2 integration for Vue Storefront.

# Quick start

Your Vue Storefront application has two parts:

1. **Server Middleware** - an Express.js application that can connect to your various third-party services (like Magento).


2. **Front-end application** - any application using JavaScript or TypeScript that can connect to the server middleware. Popular choices include [Nuxt](https://nuxt.com/) and [Next.js](https://nextjs.org/).

In this section, we will explain in a step-by-step guide how to use Magento 2 integration in each part of your Vue Storefront application.


## Prerequisites

- Magento configured - you need a Magento 2 configured
- Install Node.js version >=16.0


## Server Middleware

The first step to setup your integration is to create and configure your server middleware layer to connect to your Magento 2 backend.

Already have the server middleware configured?
If you have the server middleware configured, you can move directly to the sdk preparation section.



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

<hr />

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-27-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## How to start if you want to contribute?

Want to contribute? Ping us on `magento2` channel on [our Discord](http://discord.vuestorefront.io)!

### Requirements:
- NodeJS v16 or later
- Yarn (npm is not supprted yet)
- Magento >= v2.4.3 instance for GraphQL endpoint
- Change Magento GraphQL Query Complexity and Depth values

> Don't forget to change the Magento GraphQL Query Complexity and Depth values
Magento 2 by default has a lower value for the complexity of 300, and a higher value for the depth of 20. [Magento 2 - Issue #32427](https://github.com/magento/magento2/issues/32427#issuecomment-860478483)

>The changes are required, due to the size of the queries and mutations in the `api-client` implementation.

>To do this changes, you can use the [Magento 2 module](https://github.com/caravelx/module-graphql-config), which adds a configuration panel to your admin, or do this changes manually.


To install the Magento 2 GraphQL Config module, on your Magento installation execute:

```bash
composer require caravelx/module-graphql-config

php bin/magento module:enable Caravel_GraphQlConfig

php bin/magento setup:upgrade

php bin/magento setup:di:compile

php bin/magento setup:static-content:deploy
```

Find more information about the module [GraphQl Custom Config](https://github.com/caravelx/module-graphql-config)

### Steps
1. Build dependencies `yarn build`
    ```bash
    yarn build
    ```
8. Run `yarn dev`. You can find other commands in `package.json`
    ```bash
    yarn dev
    ```
## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Magento 2 integration Documentation (WIP)](https://docs.vuestorefront.io/magento)
- [Community Chat](http://discord.vuestorefront.io)

## Support

If you have any questions about this integration we will be happy to answer them on  `magento2-vsf2` channel on [our Discord](http://discord.vuestorefront.io).

## Contributors ✨

### Honorable Mentions
- [Caravel x](https://www.caravelx.com/)
- [Cyberfuze](https://cyberfuze.com/)
- [Leonex](https://www.leonex.de/)

Thanks go to these wonderful people 🙌:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bloodf"><img src="https://avatars.githubusercontent.com/u/1626923?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Heitor Ramon Ribeiro</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=bloodf" title="Code">💻</a> <a href="#maintenance-bloodf" title="Maintenance">🚧</a> <a href="https://github.com/vuestorefront/magento2/commits?author=bloodf" title="Documentation">📖</a> <a href="#projectManagement-bloodf" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/alefbarbeli"><img src="https://avatars.githubusercontent.com/u/7727647?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alef Barbeli</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=alefbarbeli" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=alefbarbeli" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/hcmlopes"><img src="https://avatars.githubusercontent.com/u/20449158?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Henrique Lopes</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=hcmlopes" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=hcmlopes" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/DaiLoc5698"><img src="https://avatars.githubusercontent.com/u/76195735?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Đại Lộc Lê Quang</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=DaiLoc5698" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zfmaster"><img src="https://avatars.githubusercontent.com/u/10129233?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bogdan Podlesnii</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=zfmaster" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/patrickmonteiro"><img src="https://avatars.githubusercontent.com/u/13258255?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patrick Monteiro</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=patrickmonteiro" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/KevinGorjan"><img src="https://avatars.githubusercontent.com/u/789614?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Kevin Gorjan</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=kevingorjan" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=kevingorjan" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/bartoszherba"><img src="https://avatars.githubusercontent.com/u/16045377?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bartosz Herba</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=bartoszherba" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=bartoszherba" title="Documentation">📖</a> <a href="#maintenance-bartoszherba" title="Maintenance">🚧</a> <a href="#mentoring-bartoszherba" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Abartoszherba" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Frodigo"><img src="https://avatars.githubusercontent.com/u/11998249?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marcin Kwiatkowski</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=Frodigo" title="Code">💻</a> <a href="#projectManagement-Frodigo" title="Project Management">📆</a> <a href="#business-Frodigo" title="Business development">💼</a> <a href="https://github.com/vuestorefront/magento2/commits?author=Frodigo" title="Documentation">📖</a> <a href="#ideas-Frodigo" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-Frodigo" title="Maintenance">🚧</a> <a href="#mentoring-Frodigo" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3AFrodigo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/filrak"><img src="https://avatars.githubusercontent.com/u/15185752?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Filip Rakowski</b></sub></a><br /><a href="#question-filrak" title="Answering Questions">💬</a> <a href="#mentoring-filrak" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Afilrak" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/filipsobol"><img src="https://avatars.githubusercontent.com/u/4145208?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Filip Sobol</b></sub></a><br /><a href="#question-filipsobol" title="Answering Questions">💬</a> <a href="#mentoring-filipsobol" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Afilipsobol" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/vuestorefront/magento2/commits?author=filipsobol" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/andrzejewsky"><img src="https://avatars.githubusercontent.com/u/7943292?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patryk Andrzejewski</b></sub></a><br /><a href="#question-andrzejewsky" title="Answering Questions">💬</a> <a href="#mentoring-andrzejewsky" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Aandrzejewsky" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/renanoliveira0"><img src="https://avatars.githubusercontent.com/u/1081576?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Renan Oliveira</b></sub></a><br /><a href="#tool-renanoliveira0" title="Tools">🔧</a> <a href="#plugin-renanoliveira0" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="https://github.com/domideimel"><img src="https://avatars.githubusercontent.com/u/32941053?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dominik Deimel</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=domideimel" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=domideimel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/LiorLindvor"><img src="https://avatars.githubusercontent.com/u/6757942?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Lior Lindvor</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=LiorLindvor" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/sethidden"><img src="https://avatars.githubusercontent.com/u/5359825?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Artur Tagisow</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=sethidden" title="Code">💻</a> <a href="#question-sethidden" title="Answering Questions">💬</a> <a href="#ideas-sethidden" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-sethidden" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-sethidden" title="Maintenance">🚧</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Asethidden" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/vuestorefront/magento2/commits?author=sethidden" title="Tests">⚠️</a> <a href="#tool-sethidden" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/jonathanribas"><img src="https://avatars.githubusercontent.com/u/3003782?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jonathan Ribas</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=jonathanribas" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Aliaaaam"><img src="https://avatars.githubusercontent.com/u/88658555?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Ali Ghanei</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=Aliaaaam" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mayashavin"><img src="https://avatars.githubusercontent.com/u/6650139?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Maya Shavin</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=mayashavin" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/AlexanderDevitsky"><img src="https://avatars.githubusercontent.com/u/14941520?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alexander Devitsky</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=AlexanderDevitsky" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Diegoalbag"><img src="https://avatars.githubusercontent.com/u/72459310?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Diego Alba</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=Diegoalbag" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/aelmizeb"><img src="https://avatars.githubusercontent.com/u/19288561?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Abdellatif EL MIZEB</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=aelmizeb" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bensinca"><img src="https://avatars.githubusercontent.com/u/13001260?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Beniamin Sinca</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/issues?q=author%3Abensinca" title="Bug reports">🐛</a> <a href="https://github.com/vuestorefront/magento2/commits?author=bensinca" title="Code">💻</a></td>
    <td align="center"><a href="https://blog.fts.scot/"><img src="https://avatars.githubusercontent.com/u/3168648?v=4?s=80" width="80px;" alt=""/><br /><sub><b>maaarghk</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=maaarghk" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/konarshankar07"><img src="https://avatars.githubusercontent.com/u/39480008?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Shankar Konar</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=konarshankar07" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/sequensucks"><img src="https://avatars.githubusercontent.com/u/89065178?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bratuniak Oleg</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/issues?q=author%3Asequensucks" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/drew-webscale"><img src="https://avatars.githubusercontent.com/u/102184874?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Drew Michael</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/issues?q=author%3Adrew-webscale" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

