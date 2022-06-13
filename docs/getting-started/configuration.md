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

## What's next

As the next step, we will learn about [Layouts and Routing](./layouts-and-routing.html) and show what routes come predefined in every Vue Storefront project and how to register custom ones.
