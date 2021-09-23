# nuxt-segment

Find more information about [nuxt-segment](https://github.com/dansmaculotte/nuxt-segment)


### Installation
First, you need to add the [nuxt-segment](https://github.com/dansmaculotte/nuxt-segment) to your application:

```bash
yarn add nuxt-segment
```

Then, on the `nuxt.config.js` file, you need to add it to the `modules` key.

```js
export default {
  modules: [
    // Simple usage
    '@dansmaculotte/nuxt-segment',

    // With options
    [
      '@dansmaculotte/nuxt-segment',
      { /* module options */ }
    ],
  ],

  // Or with global options
  segment: {
    writeKey: '',
    disabled: false,
    useRouter: true
  }
}
```

More information about the [module options](https://github.com/dansmaculotte/nuxt-segment#options)
