# Configuration

Whenever starting a new project or jumping into an existing one, you should look into the configuration files first. They control almost every aspect of the application, including installed integrations.

## Mandatory configuration files

Every Vue Storefront project must contain two configuration files described below. They control both client and server parts of the application.

### `nuxt.config.js`

**The `nuxt.config.js` file is the starting point of every project.** It contains general configuration, including routes, global middlewares, internationalization, or build information. This file also registers modules and plugins to add or extend framework features. Because almost every Vue Storefront integration has a module or plugin, you can identify which integrations are used by looking at this file.

You can learn more about this file and available configuration options on the [Nuxt configuration file](https://nuxtjs.org/docs/directory-structure/nuxt-config/) page.

### `middleware.config.js`

The `middleware.config.js` file is as essential as `nuxt.config.js`, but much simpler and likely smaller. It configures the Server Middleware used for communication with e-commerce platforms and contains sensitive credentials, custom endpoints, queries, etc.

### `.env`

The `.env` file contains environmental variables used in both `nuxt.config.js` and `middleware.config.js` files for configuration that differs per environment. New projects come with a `.env.example` that you can rename (or clone) to the `.env` file and configure.

## Optional configuration files

Your project might include some additional configuration files not described above. Let's walk through the most common ones.

- [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) configures compiler used to strongly type the project using TypeScript language. It defines a list of files and directories to be included and excluded from analysis and compiling.

- [`babel.config.js`](https://babeljs.io/docs/en/config-files) configures Babel compiler used to make the code backward compatible with older browsers and environments.

- [`ecosystem.config.js`](https://pm2.keymetrics.io/docs/usage/application-declaration/) configures PM2 Process Management that runs and manages Node application.

- [`jest.config.js`](https://jestjs.io/docs/configuration) configures Jest testing framework, used for writing and running unit tests.

## Magento Configuration

In some cases Magento doesn't provide configuration values by GraphQL API. Then we recommend to set up a configuration
fields and values in the `middleware.config.js` file. Example:

```javascript
customer: {
  customer_create_account_confirm: true
}
```

### How to set a config flag in the middleware.config.js
When you want to set a new flag, you need to:
1. declare field in the `integrations.magento` object:
```javascript
module.exports = {
    integrations: {
        magento: {
          // (...) other fields
          foo: { // your new area of config
            your_new_config_value: true // your new flag
          }
        }
    }
}
```
2. Get a new field in the `nuxt.config.js` file from the middleware config:
```javascript
import middleware from './middleware.config';

const {
  integrations: {
    magento: {
      configuration: {
        cookies,
        externalCheckout,
        // (...) other fields
        foo // your new object
      },
    },
  },
} = middleware;
```
3. Pass the new field to the `'~/modules/magento'` module configuration:
```javascript
['~/modules/magento', {
  cookies,
  externalCheckout,
  // (...) other fields
  foo // your new object
}],
```
4. Now you can get the value of your config object in a composable/compoonent like this:
```javascript
import { useContext } from '@nuxtjs/composition-api';
// (...)
const { app } = useContext();
const { foo } = app.context.$vsf.$magento.config; // here you go
```

#### Predefined Magento config fields
##### Customer
`customer_create_account_confirm` - it correspond to the Magento **Require Emails Confirmation** config flag:

**Magento config:** `Stores -> Configuration -> Customers -> Customers configuration -> Require Emails Confirmation`
**Possible values:** `boolean`

**Consequences:**
- when is set to true, then email confirmation is required after customer registration.
- when is set to false, user can register and then is immediately logged-in as a customer.

## What's next

As the next step, we will learn about [Layouts and Routing](./layouts-and-routing.html) and show what routes come predefined in every Vue Storefront project and how to register custom ones.
