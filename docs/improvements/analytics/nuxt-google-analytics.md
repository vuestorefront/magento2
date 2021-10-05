# @nuxtjs/google-analytics

Find more information about [@nuxtjs/google-analytics](https://google-analytics.nuxtjs.org/)


### Installation
First, you need to add the [@nuxtjs/google-analytics](https://google-analytics.nuxtjs.org/) to your application:

```bash
yarn add @nuxtjs/google-analytics
```

Then, on the `nuxt.config.js` file, you need to add it to the `buildModules` key.

```js
{
  buildModules: [
    '@nuxtjs/google-analytics'
  ]
}
```

To configure it add `googleAnalytics` section in `nuxt.config.js` to set the module options:
```js
export default {
  googleAnalytics: {
    id: 'UA-XXX-X'
  }
}
```



More information about the [module options](https://google-analytics.nuxtjs.org/options)
