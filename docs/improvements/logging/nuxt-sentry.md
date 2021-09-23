# @nuxtjs/sentry

Find more information about [@nuxtjs/sentry](https://sentry.nuxtjs.org/)


### Installation
First, you need to add the [@nuxtjs/sentry](https://sentry.nuxtjs.org/) to your application:

```bash
yarn add @nuxtjs/sentry
```

Then, on the `nuxt.config.js` file, you need to add it to the `modules` key.

```js
export default {
  modules: [
    '@nuxtjs/sentry'
  ],
  sentry: {
    dsn: '', // Enter your project's DSN here
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
  }
}
```

More information about the [module options](https://sentry.nuxtjs.org/sentry/options)
