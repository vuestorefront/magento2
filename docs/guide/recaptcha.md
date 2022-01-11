# reCaptcha

You can activate the reCaptchta feature using this Guidelines.

## Activate reCaptcha module

Uncomment the line below in the `nuxt.config.js` file to activate the module.

```js
...
    '@vue-storefront/middleware/nuxt',
    '@nuxtjs/html-validator',
    // '@nuxtjs/recaptcha',
  ],
  recaptcha: {
...

```

## Configure the reCaptcha

On the `config` folder update the config file (`dev.json` for example) with your configurations.

```json5
{
  ...
  "recaptchaSize": "{YOUR_RECAPTCHA_SIZE}",
  "recaptchaSiteKey": "{YOUR_RECAPTCHA_SITE_KEY}",
  "recaptchaSecretkey": "{YOUR_RECAPTCHA_SECRET_KEY}",
  "recaptchaVersion": "{YOUR_RECAPTCHA_VERSION}",
  "recaptchaMinScore": "{YOUR_RECAPTCHA_MIN_SCORE}"
  ...
}
```
