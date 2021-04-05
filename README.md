![Vue Storefront](https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067)

# Vue Storefront Next Magento Integration

<a href="https://slack.vuestorefront.io">![Branch Develop](https://img.shields.io/badge/community%20chat-slack-FF1493.svg)</a>

> **Disclaimer:** This project is still in beta phase.

This repository is a starting point for creating new integrations for [Vue Storefront Next with Magento](https://github.
com/DivanteLtd/vue-storefront/tree/next).

- [Demo]() (WIP)
- [Documentation](https://docs-next.vuestorefront.io/magento/) (WIP)

This repository is a monorepo containing three projects:

- **api-client** - communicates with a shopify backend;
- **composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
- **theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## How to start?
1. Configure packages/theme/nuxt.config.js to establish the connection to your Magento store.

2. Install all required dependencies:

```sh
yarn install or yarn
```

3. (optional) Then you can verify if everything works properly by building all three projects:

```sh
yarn build
```

4. If everything built properly, you can start customizing your storefront:

```sh
yarn dev
```
