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

## Enabling GraphQL Caching on Magento with Varnish

To enable the GraphQL caching on Magento, first you need to have installed the Varnish and have it configured into your environment.

1. Edit the `default.vcl` file on your system, and update the `vcl_hash` subroutine, to check whether the request URL contains `graphql`, as follows:
```
sub vcl_hash {
    if (req.http.cookie ~ "X-Magento-Vary=") {
        hash_data(regsub(req.http.cookie, "^.*?X-Magento-Vary=([^;]+);*.*$", "\1"));
    }

    # For multi site configurations to not cache each other's content
    if (req.http.host) {
        hash_data(req.http.host);
    } else {
        hash_data(server.ip);
    }

    if (req.url ~ "/graphql") {
        call process_graphql_headers;
    }

    # To make sure http users don't see ssl warning
    if (req.http./*  */) {
        hash_data(req.http./*  */);
    }
}
```
2. Then you need to add the `process_graphql_headers` subroutine to the `default.vcl` file:
```
sub process_graphql_headers {
    if (req.http.Store) {
        hash_data(req.http.Store);
    }
    if (req.http.Content-Currency) {
        hash_data(req.http.Content-Currency);
    }
}
```
> Query results should not be cached for logged in customers, because it cannot be guaranteed that these results are applicable to all customers. For example, you can create multiple customer groups and set up different product prices for each group. Caching results like these might cause customers to see the prices of another customer group.

You can find more information about this topic at https://devdocs.magento.com/guides/v2.4/graphql/caching.html#caching-with-varnish

3. Open the `middleware.config.js` file, it should be located on the root folder of your store, there you will change the flag `useGETForQueries` to `true` to enable the usage of GET request for queries

```
customApolloHttpLinkOptions: {
  useGETForQueries: false,
},
```
