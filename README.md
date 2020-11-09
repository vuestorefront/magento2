![Vue Storefront](https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067)

# Boilerplate for Vue Storefront Next

<a href="https://slack.vuestorefront.io">![Branch Develop](https://img.shields.io/badge/community%20chat-slack-FF1493.svg)</a>

> **Disclaimer:** This project is still in beta phase.

This repository is a starting point for creating new integrations for [Vue Storefront Next](https://github.com/DivanteLtd/vue-storefront/tree/next).

* [Documentation](https://docs-next.vuestorefront.io/) (WIP)
* [Demo](https://vsf-next-demo.storefrontcloud.io/) (WIP)


This repository is a monorepo containing three projects:

* **api-client** - communicates with a backend;
* **composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## Installation

Before starting, you have to install all required dependencies:

```sh
yarn install
```

Then you can verify if everything works properly by building all three projects:

```sh
yarn build
```

If everything built properly, you can start creating your new integration with:

```sh
yarn dev
```
