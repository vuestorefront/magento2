# nuxt-purgecss

To improve the page speed, we can remove some CSS sent to the user by eliminating the unused CSS, from the final bundle.

Using the `PurgeCSS` module as the base, the `nuxt-purgecss` removes that excess of CSS, and clean the final bundle that will be sent.

Find more information about [nuxt-purgecs](https://github.com/Developmint/nuxt-purgecss)


### Installation
First, you need to add the [nuxt-purgecs](https://github.com/Developmint/nuxt-purgecss) to your application:

```bash
yarn add nuxt-purgecss
```

Then, on the `nuxt.config.js` file, you need to add it to the `modules` key.

```js
export default {
  buildModules: [
    // Simple usage
    'nuxt-purgecss',

    // With options
    ['nuxt-purgecss', { /* module options */ }],
  ]
}
```

More information about the [module options](https://github.com/Developmint/nuxt-purgecss#options)
