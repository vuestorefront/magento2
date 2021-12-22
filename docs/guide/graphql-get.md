# Use GET for GraphQL Queries

In Magento we can leverage the power of GET requests caching, to improve the performance of your GrpahQL API. In order to do this, you need to setup your Magento backend and configure the Vue Storefront Magento integration. 

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

You can find more information about this topic at [https://devdocs.magento.com/guides/v2.4/graphql/caching.html#caching-with-varnish]

3. Open the `middleware.config.js` file, it should be located on the root folder of your store, there you will change the flag `useGETForQueries` to `true` to enable the usage of GET request for queries

```
customApolloHttpLinkOptions: {
  useGETForQueries: false,
},
```
