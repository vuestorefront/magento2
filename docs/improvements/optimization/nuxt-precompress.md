# nuxt-precompress

Enabling `gzip` and `brotli` compression algorithms in your application is always an excellent solution to improve the loading speed in your application. There are some caveats, like the increase of CPU usage when using compression algorithms.

Find more information about [nuxt-precompress](https://github.com/frenchrabbit/nuxt-precompress)

### Installation
First, you need to add the [nuxt-precompress](https://github.com/frenchrabbit/nuxt-precompress) to your application:

```bash
yarn add nuxt-precompress
```

Then, on the `nuxt.config.js` file, you need to add it to the `modules` key.

```js
// nuxt.config.js
export default {
  // ...
  modules: ['nuxt-precompress'],
  // Default options, override if needed
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true, 
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },
 
    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  }
  // ...
}
```
