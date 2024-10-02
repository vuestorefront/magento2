# Custom Queries

## Introduction

Sometimes, you may need to fetch data from the API that is not covered by the default methods. In this case, you can use the the custom queries feature to extend defaults by your own GraphQL queries.

Creating a custom query requires a few steps:

- adding a custom query to the `middleware.config.js` file,
- (optional) overwriting the default response interface.
- using the custom query in the method.

## Custom queries in middleware.config.js

To use custom queries, you need to add them to the `customQueries` object in the `middleware.config.js` file.

In the example below, we are adding a custom query called `customer-custom-query`:

```ts
// middleware.config.js

// ...

export const integrations = {
  magento: {
    location: "@vue-storefront/magento-api/server",
    configuration: {
      // ...
    },
    customQueries: {
      "customer-custom-query": ({ query, variables, metadata }) => ({
        variables,
        query: `
          query customer {
            customer {
              ${metadata.fields}
            }
          }
         `,
      }),
    },
  },
};
```

## Using custom queries

To use a custom query, you need to pass the `customQuery` parameter to the method. The `customQuery` parameter is an object that contains the name of the custom query and the variables that should be passed to it.

In our example, we're fetching basic user profile and using the `customQuery` parameter to leverage the custom GraphQL query from the previous example.

:::tip Overwriting the default response interface
Notice how we are using the type parameter to overwrite the default response interface.
:::

```ts
import { sdk } from "~/sdk.config.ts";

type CustomerCustomQueryResponse = {
  customer: {
    email: string;
    firstname: string;
    lastname: string;
  };
};

const customQuery = {
  customer: "customer-custom-query",
  metadata: {
    fields: "email firstname lastname",
  },
};

// We assume that token was already fetched and stored in the `token` variable.
const result = await sdk.magento.customer(
  customQuery,
  customHeaders: { Authorization: `Bearer ${token}` },
);
```
