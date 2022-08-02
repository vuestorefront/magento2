# Server-Side Rendering Cache

## Introduction

VueStorefront 2 - Magento 2 integrations use @vue-storefront/cache module that adds possibility to cache some server-side
rendered pages.

### What is cached

The cached pages are:

- Home page with the `Vhome` tag.
- All CMS pages with the `V${page.identifier}` tag
- Category page with the `Vcategory` tag and tags for products: `P${product.uid}` as well as categories `C${category.slug}`
- Product page with the `Vproduct-${route.value.params.id}` tag and tags for the main product `P${product.uid}` as well as categories `C${cat.id}`

## Invalidating tags

To invalidate a tag and remove pages associated with that tag, use the [Invalidation endpoint](https://docs.vuestorefront.io/v2/performance/ssr-cache.html#invalidating-tags).

Go to the route configured in the `.env` file under the `VSF_REDIS_CACHE_INVALIDATE_KEY` key with two query parameters:

- `key` — string matching the `VSF_REDIS_CACHE_INVALIDATE_KEY` key in the `.env` file.
- `tags` — a comma-separated list of tags for invalidation.

Assuming that you are running the application locally, the `VSF_REDIS_CACHE_INVALIDATE_URL` key is equal to `/cache-invalidate,` and the `VSF_REDIS_CACHE_INVALIDATE_KEY` key is equal to `secret_key`, and you want to invalidate the `Vhome` tag, the full URL will look like this:

## How to cache other pages

We added caching only to the most visited pages. However, you can cache other pages as well, including custom ones. You can find detailed instructions on how to use cache on the [SSR Cache](https://docs.vuestorefront.io/v2/performance/ssr-cache.html) and [Redis cache](https://docs.vuestorefront.io/v2/integrations/redis-cache.html) pages.

:::tip
You don't need to add any additional packages to cache more pages — just add or modify tags in components.
:::

## Cache drivers

`@vue-storefront/cache` module is open source and provided Out Of The Box by Magento 2 integration.
To set up caching in your store, you must install and configure a cache driver.
You can use our enterprise `@vsf-enterprise/redis-cache` module, or build your cache driver.

### Redis cache (enterprise)

Once you have access to the [Vue Storefront npm registry](https://docs.vuestorefront.io/v2/general/enterprise.htm),
you can install the Redis cache driver by running this command in a console:

`yarn add @vsf-enterprise/redis-cache`

#### redis cache configuration

Once you have the Redis driver installed, you need to add the Redis configuration to your project's `.env` file.

```
.env
VSF_REDIS_HOST=127.0.0.1
VSF_REDIS_PORT=6379
VSF_REDIS_KEY_PREFIX=
VSF_REDIS_CACHE_INVALIDATE_URL=/cache-invalidate
VSF_REDIS_ENABLED=true
```

Then you have to update `nuxt.config.js file` and add this to the `modules` object:

```javascript
['@vue-storefront/cache/nuxt', {
  enabled: process.env.VSF_REDIS_ENABLED,
  invalidation: {
    endpoint: process.env.VSF_REDIS_CACHE_INVALIDATE_URL,
    key: process.env.VSF_REDIS_CACHE_INVALIDATE_KEY,
    handlers: [
      '@vue-storefront/cache/defaultHandler',
    ],
  },
  driver: [
    '@vsf-enterprise/redis-cache',
    {
      // docs: https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
      redis: {
        keyPrefix: process.env.VSF_REDIS_KEY_PREFIX,
        host: process.env.VSF_REDIS_HOST,
        port: process.env.VSF_REDIS_PORT,
      },
    },
  ],
}],
```

## Useful links

- [Server Side Rendering Cache](https://docs.vuestorefront.io/v2/performance/ssr-cache.html)
- [Redis cache](https://docs.vuestorefront.io/v2/integrations/redis-cache.html)
- [Integrating cache driver](https://docs.vuestorefront.io/v2/integrate/cache-driver.html)
