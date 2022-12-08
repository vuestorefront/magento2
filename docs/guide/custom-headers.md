# Add custom headers to queries

Queries and mutations have for default `Authorization`, `store`, `Content-Currency` headers.
To add or override headers in the query or mutation need to add a customHeaders argument in the api method.

## Examples

Below is the example on how to add custom headers to the `createCustomer` api method.

```js
const { data, errors } = await app.$vsf.$magento.api.createCustomer(
  {
    email,
    password,
    recaptchaToken,
    ...baseData,
  },
  customQuery,
  customHeaders,
);
```

Where
```js
const customHeaders = {
  'Accept-Language': 'en',
};
```

Below is the example on how to add custom headers to the `customQuery` api method.

```js
const { data } = await app.context.$vsf.$magento.api.customQuery({
  query: categoryMetaGql,
  queryVariables: {
    filters: {
      category_uid: {
        eq: params.category_uid,
      },
    },
  },
  customHeaders: {
    'Accept-Language': 'en',
  },
});
```

### Override default headers

Below is the example on how to override default headers in the `products` api method.

```js
const { data } = await context.app.$vsf.$magento.api.products(
  searchParams,
  customQuery,
  customHeaders,
);
```

Where
```js
const customHeaders = {
  store: 'en',
};
```

This code will replace a default store header with your custom.
