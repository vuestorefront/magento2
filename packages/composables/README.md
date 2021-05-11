<img src="https://blog.vuestorefront.io/wp-content/uploads/2020/01/1QU9F6hQlFyHsJIbsdmt6FA.png" height="100px" />

## Vue Storefront 2 integration with Magento (WIP)

This project is a Magento 2 integration for Vue Storefront 2.
This integration is being developed by superheroes from [Cyberfuze](https://cyberfuze.com/), [Ecritel](https://www.ecritel.com/) and [Leonex](https://www.leonex.de/) ❤️

## How to start if you want to try out the integration

```
yarn global add @vue-storefront/cli
```
```
vsf init <project_name> && cd <project_name> && yarn && yarn dev
```

## How to start if you want to contribute?

Want to contribute? Ping us on `magento2-vsf2` channel on [our Discord](https://discord.vuestorefront.io)!
### Requirements:
  - NodeJS v12 or later
  - Magento v2.4 instance for GraphQL endpoint
### Steps
1. Fork the repo
2. Clone your fork of the repo
    ```
    example:
    git clone https://github.com/vuestorefront/magento2.git
    cd magento2
    ```
3. Checkout develop branch `git checkout develop`
4. Run `yarn` to install dependencies
5. Copy .env.example and update GraphQL Endpoint
    ```
    cp packages/theme/.env.example .env
    ```
6. Update `MAGENTO_GRAPHQL=` with url to Magento 2.4 GrapgQL endpoint
    ```
    MAGENTO_GRAPHQL=https://{YOUR_SITE_FRONT_URL}/graphql
    ```
7. Build dependencies `yarn build:api-client && yarn build:composables`
8. Run `yarn dev:theme` to run theme. You can find other commands in `package.json`
- If you need HMR on Api Client/Composables run `yarn dev:api-client` or `yarn dev:composables` on a separate terminal window.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Magento 2 integration Documentation (WIP)](https://docs.vuestorefront.io/magento)
- [Community Chat](https://discord.vuestorefront.io)

## Support

If you have any questions about this integration we will be happy to answer them on  `magento2-vsf2` channel on [our Discord](discord.vuestorefront.io).
