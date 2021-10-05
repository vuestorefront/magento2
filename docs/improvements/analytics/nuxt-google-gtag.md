# @nuxtjs/google-gtag

Find more information about [@nuxtjs/google-gtag](https://github.com/nuxt-community/google-gtag-module)


### Installation
First, you need to add the [@nuxtjs/google-gtag](https://github.com/nuxt-community/google-gtag-module) to your application:

```bash
yarn add @nuxtjs/google-gtag
```

Then, on the `nuxt.config.js` file, you need to add it to the `modules` key.

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/google-gtag',

    // With options
    ['@nuxtjs/google-gtag', { /* module options */ }]
  ]
}
```

Or you can configure it using the top level options

```js
{
  modules: [
    '@nuxtjs/google-gtag'
  ],
  'google-gtag': {
    id: 'UA-XXXX-XX',
    config: {
      anonymize_ip: true, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ['domain.com','domain.org']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
    additionalAccounts: [{
      id: 'AW-XXXX-XX', // required if you are adding additional accounts
      config: {
        send_page_view: false // optional configurations
      }
    }]
  }
}
```

More information about the [module options](https://github.com/nuxt-community/google-gtag-module#options)
