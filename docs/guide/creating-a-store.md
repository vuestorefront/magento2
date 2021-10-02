# Creating a new store

To create a new Vue Storefront Magento 2 store, there are two available options:

1. [Using the Vue Storefront CLI](#using-the-vue-storefront-cli)
2. [Cloning the template store](#cloning-the-template-store)

## Requirements

- Node.Js 14+
- Magento 2.4.3+ instance for GraphQL endpoint
- Change Magento GraphQL Query Complexity and Depth values

::: warning Don't forget to change the Magento GraphQL Query Complexity and Depth values
Magento 2 by default has a lower value for the complexity of 300, and a higher value for the depth of 20. [Magento 2 - Issue #32427](https://github.com/magento/magento2/issues/32427#issuecomment-860478483)

The changes are required, due to the size of the queries and mutations in the `api-client` implementation.

To do this changes, you can use the [Magento 2 module](https://github.com/caravelx/module-graphql-config), which adds a configuration panel to your admin, or do this changes manually.
:::

To install the Magento 2 GraphQL Config module, on your Magento installation execute:

```bash
composer require caravelx/module-graphql-config

php bin/magento module:enable Caravel_GraphQlConfig

php bin/magento setup:upgrade

php bin/magento setup:di:compile

php bin/magento setup:static-content:deploy
```

Find more information about the module [GraphQl Custom Config](https://github.com/caravelx/module-graphql-config)

## Using the Vue Storefront CLI

To create a new store using the Vue Storefront CLI, first you need to install the CLI

```bash
npm i -g @vue-storefront/cli
```

Then you must create the new store using the newly installed CLI

```bash
vsf init <project_name>
# And choose Magento 2
```

## Cloning the template store

To create a new store cloning the template store, you need to clone the Magento base template store.

```bash
git clone https://github.com/vuestorefront/template-magento <project-name>
```
