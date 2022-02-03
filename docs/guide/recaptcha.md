# reCaptcha

You can activate the reCaptchta feature using these Guidelines.

## Activate reCaptcha module

Add the `@nuxtjs/recaptcha'` module to `modules` in the `nuxt.config.js` file.

```javascript
modules: [
  // other modules
  '@nuxtjs/recaptcha',
],

```

Add additional config to the `next.config.js`:
```javascript
recaptcha: {
    hideBadge: config.get('recaptchaHideBadge'), // Hide badge element (v3 & v2 via size=invisible)
    siteKey: config.get('recaptchaSiteKey'), // Site key for requests
    version: config.get('recaptchaVersion'), // Version 2 or 3
    size: config.get('recaptchaSize'), // Size: 'compact', 'normal', 'invisible' (v2)
  },
  publicRuntimeConfig: {
    isRecaptcha: config.get('recaptchaEnabled'),
  },
```

## Configure the reCaptcha

On the `config` folder update the config file (`dev.json` for example) with your configurations.

```json5
{
  ...
  "recaptchaEnabled": "{YOUR_RECAPTCHA_ENABLED}", // true or false, default value is false
  "recaptchaHideBadge": "{YOUR_RECAPTCHA_HIDE_BADGE}", // true or false, default value is false
  "recaptchaSize": "{YOUR_RECAPTCHA_SIZE}", // Size: 'compact', 'normal', 'invisible' (v2), default value is 'invisible'
  "recaptchaSiteKey": "{YOUR_RECAPTCHA_SITE_KEY}", // Site key for requests, default value is ''
  "recaptchaSecretkey": "{YOUR_RECAPTCHA_SECRET_KEY}", // Secret key for requests, default value is ''
  "recaptchaVersion": "{YOUR_RECAPTCHA_VERSION}", // Version 2 or 3, default value is 3
  "recaptchaMinScore": "{YOUR_RECAPTCHA_MIN_SCORE}" // The min score used for v3, default value is 0.5
  ...
}
```

or add ENV variables:
```
RECAPTCHA_ENABLED=true
RECAPTCHA_HIDE_BADGE=false
RECAPTCHA_VERSION=3
RECAPTCHA_SITE_KEY={YOUR_RECAPTCHA_SITE_KEY}
RECAPTCHA_SECRET_KEY={YOUR_RECAPTCHA_SECRET_KEY}
RECAPTCHA_SIZE=invisible
RECAPTCHA_MIN_SCORE=0.5
```

### Sample configuration

```json5
{
  ...
  "recaptchaEnabled": true,
  "recaptchaHideBadge": false,
  "recaptchaSize": "invisible",
  "recaptchaSiteKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "recaptchaSecretkey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "recaptchaVersion": 3,
  "recaptchaMinScore": 0.5
  ...
}
```

## Areas where reCaptcha is implemented:
- login modal
- add review form on product page
- use Account step on checkout
- reset password form
