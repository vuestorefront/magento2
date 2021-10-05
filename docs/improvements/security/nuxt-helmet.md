# nuxt-helmet

Adding a security layer to your application is also essential. The `helmet` like module for nuxt adds a security layer on top of your application.

Find more information about [nuxt-helmet](https://github.com/victor-perez/nuxt-helmet)

### Installation

First, you need to add the [nuxt-helmet](https://github.com/victor-perez/nuxt-helmet) module to your application:

```bash
yarn add nuxt-helmet
```

Then, on the `nuxt.config.js` file, you need to add it to the `modules` key.

```js
{
  modules: [
    'nuxt-helmet'
    //...other modules
 ],
 // helmet options
 // @see https://helmetjs.github.io/docs/
 helmet: {
    /*
    frameguard: false,
    ...
    */
 }
}
```
