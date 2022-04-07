# Setup Guide for a Local Installation of Magento Server + Integration

🚧 This guide uses the `develop` branch, which is still under construction. Various steps might change or fall away altogether in the future.

ℹ️ In this installation guide, I will use `magento.dev` as a domain. If it doesn’t already exist in your [hosts](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/) file, it will be added for you. You can pick whichever domain name you’d like for this.

## Table of Contents

1. [Setup the Magento Server](#setup-the-magento-server-)
2. [Setup the Magento Integration](#setup-the-magento-integration-)
3. [Correct Magento Categories Settings](#correct-magento-categories-settings-)

## Setup the Magento Server 🪄

There is a pretty nice [Docker image for Magento](https://github.com/markshust/docker-magento), which takes care of (almost) anything.

```bash
mkdir magento-docker
cd magento-docker
curl -s https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup | bash -s -- magento.dev 2.4.3-p1
```

💡 After this is done, you can check the (empty) Magento site on [https://magento.dev](https://magento.dev).

😈 If on Mac you get an error that ports _80_ and/or _443_ are already in use by other processes, execute `killall httpd` to get rid of them.

### Set up your Magento authentication

💡 This step is only necessary if you want to set up sample data.

☝ If you haven’t already, sign up for a [Magento marketplace account](https://marketplace.magento.com) and [generate new access keys](https://marketplace.magento.com/customer/accessKeys/).

1. Copy the sample auth file:
   `cp src/auth.json.sample src/auth.json`
2. Open the file and replace the value for the `username` with your **public access key** and the value for the `password` with your **private access key**.

```json
{
  "http-basic": {
    "repo.magento.com": {
      "username": "a1c69cb...",
      "password": "af041560..."
    }
  }
}
```

3. Copy the file to the container: `bin/copytocontainer auth.json`

### Populate with sample data

Grad your **public-** and **private key** from your Magento account:
[https://marketplace.magento.com/customer/accessKeys/](https://marketplace.magento.com/customer/accessKeys/)

_(If you don’t have an account yet, create one)_

ℹ️ Use your public key as **username** and private key as **password** in the following commands.

```bash
bin/magento sampledata:deploy
bin/magento setup:upgrade
```

💡 After this is done, you can check the Magento site on [https://magento.dev](https://magento.dev), where items should now appear.

🚩 If `bin/magento sampledata:deploy` doesn’t work, delete the `auth.json` file and try again. Manually enter the public and private keys in the console when prompted.

### Enable CORS

You need to enable CORS in your Magento instance, so requests from other domains (such as magento.dev 👀) are being accepted.

1. Require the module: `bin/composer require graycore/magento2-cors`
2. Configure the module: Edit the env.php file (`bin/cli vi app/etc/env.php`) and add the following lines at the end of the file:

```php
'system' => [
       'default' => [
            'web' => [
                'graphql' => [
                    'cors_max_age' => 86400,
                    'cors_allow_credentials' => 0,
                    'cors_allowed_methods' => 'POST, OPTIONS, GET',
                    'cors_allowed_headers' => 'Content-Currency, Store, X-Magento-Cache-Id, X-Captcha, Content-Type, Authorization, DNT, TE',
                    'cors_allowed_origins' => '*'
                ]
            ]
        ]
]
```

3. Enable the module: `bin/magento module:enable Graycore_Cors`
4. Make sure the module was registered correctly: `bin/magento setup:upgrade`

## Setup the Magento Integration 🔌

### Download the integration

ℹ️ This command uses the **develop** branch, since it is the closest to the future production-ready version.

```bash
git clone https://github.com/vuestorefront/magento2.git magento-vsf -b develop
cd magento-vsf
yarn install
```

### Set up the environment variables

☝ These variables are based on `packages/theme/.env.example`

```
VSF_NUXT_APP_ENV=development
VSF_NUXT_APP_PORT=3000

VSF_STORE_URL=http://local.dev:3000

VSF_MAGENTO_BASE_URL=local.dev
VSF_MAGENTO_GRAPHQL_URL=https://local.dev/graphql

VSF_MAGENTO_EXTERNAL_CHECKOUT_ENABLED=false
VSF_MAGENTO_EXTERNAL_CHECKOUT_URL=https://local.dev
VSF_MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH=/vue/cart/sync

VSF_IMAGE_PROVIDER=cloudinary
VSF_IMAGE_PROVIDER_BASE_URL=https://res-4.cloudinary.com/dnozky7on/image/upload/

VSF_REDIS_ENABLED=false
VSF_REDIS_HOST=127.0.0.1
VSF_REDIS_PORT=6379
VSF_REDIS_KEY_PREFIX=
VSF_REDIS_CACHE_INVALIDATE_URL=/cache-invalidate

VSF_RECAPTCHA_ENABLED=false
VSF_RECAPTCHA_SITE_KEY=
VSF_RECAPTCHA_SECRET_KEY=
VSF_RECAPTCHA_HIDE_BADGE=
VSF_RECAPTCHA_SIZE=invisible
VSF_RECAPTCHA_MIN_SCORE=0.5
VSF_RECAPTCHA_VERSION=3

# Don't use this in a production environment!
NODE_TLS_REJECT_UNAUTHORIZED=0

```

🚩 The line `NODE_TLS_REJECT_UNAUTHORIZED=0` is added to avoid a `unable to verify the first certificate` error. **Please don’t use this in production.**

☝ These variables are based on `packages/theme/.env.example`

```
VSF_MAGENTO_GRAPHQL_URL=https://magento.dev/graphql
```

### Spin up development environment

```bash
yarn build
yarn dev:theme
```

## Correct Magento categories settings 🔧

In the default Magento installation, categories are configured in a way that the category pages in the Vue Storefront integration don’t work. This is something that needs to be done in the **Magento admin page**.

### Create an admin user

```bash
bin/magento admin:user:create
```

### Disable 2FA

Two-Factor Authentication is set up by default on the Magento server but doesn’t work out of the box. For the sake of getting the development environment running, it’s the easiest to disable this feature.

```bash
bin/magento module:disable Magento_TwoFactorAuth
```

### Login & Correct the categories

1. Go to [magento.dev/admin](http://magento.dev/admin) to login with the new admin user you created in the first step
2. Click on `Catalog` > `Categories` and select a category (e.g. `Gear`) by clicking on it
3. Go to _Display Settings_ and set **Display Mode** to `Products Only`
4. Save the changes
5. Repeat for all (main?) categories
6. Reindex and flush the cache with this command in the `magento-docker` folder:
   `bin/magento indexer:reindex && bin/magento cache:flush`
