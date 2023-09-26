# Server Middleware

The Server Middleware is an Express.js application implemented for a variety of reasons, such as:

- connect multiple services using different technologies and libraries,
- allow you to create and [extend](/integrate/extending-integrations.html) integrations to add new capabilities or modify their behavior,
- give you control of the requests sent to the integration platform and responses sent back to the Nuxt.js application,
- securely store credentials on the server without exposing them to the end-users of your application,
- improve the performance by moving all logic of the networking layer to the server, thus shipping less code to the browser.


## Architecture

The easiest way to explain the Server Middleware architecture is to base the explanation on the Vue Storefront Integration context.

::: tip C4 diagrams
We're using C4 diagrams to describe the architecture, to learn more about it you can check out [The C4 model for visualising software architecture](https://c4model.com/) website.
:::

### System context level

On this level, we can say that Vue Storefront Integration is a software system that can communicate with multiple 3rd party providers like Commerce Platforms, CMS, Payments, etc...

![System context level](https://res.cloudinary.com/vue-storefront/image/upload/v1677521743/Integrations_Workspace_-_Copy_of_System_context_level_ufe60v.jpg)

### System container level

Vue Storefront Integration contains two containers - `storefront` (our frontend) and `server middleware` (backend for frontend).

![System container level](https://res.cloudinary.com/vue-storefront/image/upload/v1678201501/C4%20Integrations/Integrations_Workspace_-_Copy_of_System_container_level_jj4n84.jpg)

### System components level - Server Middleware components

In the container, the server application uses the integration that can communicate with the external service provider (e.g. commerce backend). The integration can be extended by the integration extensions. Middleware config is provided for both integration and its extensions.

![System components level - Middleware components](https://res.cloudinary.com/vue-storefront/image/upload/v1677519996/C4%20Integrations/Integrations_Workspace_-_System_component_level_-_Middleware_ioiogo.jpg)

## Configuration

Usually, Vue Storefront application comes with the `middleware.config.js` file located at the project's root. This is where you can register packages that extend the Server Middleware by adding new API endpoints or modifying the Express.js application itself.

```javascript
// middleware.config.js
export const integrations = {

}
```

Every integration you register inside of this file must have a unique key provided in the installation guide of said extension. That key is used for communication with the middleware, so changing it might cause the integration to break.

Registered integrations should have a configuration matching the [Integration interface](https://docs.vuestorefront.io/v2/reference/api/core.integration.html).

```javascript
// middleware.config.js
export const integrations = {
    magento: {
      location: '',
      extensions: (baseExtensions) => [
        ...baseExtensions,
        // other extensions
      ],
      configuration: {},
      customQueries: {}
    }
}
```

## Running the server middleware

Running the server middleware requires the `@vue-storefront/middleware` package. It exposes `createServer` function, that uses the `integrations` defined in your configuration to initialize a server.
```javascript
// middleware.js

import { createServer } from "@vue-storefront/middleware";
import { integrations } from "./middleware.config.js";

(async () => {
  const app = await createServer({ integrations });

  app.listen(8181, () => {
    console.log('Middleware started');
  });
})();
```

By default in Vue Storefront applications, server middleware is running on port `8181`.

## Extending the server middleware

Middleware extensions allow you to extend your Express.js server, register additional API endpoints, or hook into the
lifecycle of a request sent to a given Server Middleware integration from the application.

![Middleware lifecycle](https://res.cloudinary.com/vue-storefront/image/upload/v1678260609/Flowcharts/Integrations_Workspace_-_Extending_the_middleware_mw5nad.jpg)

### Creating an extension

You can define as many extensions as you want. Each extension has the following structure:

```js
const extension = {
  name: 'extension-name',
  extendApiMethods: {
    customMethod: (context, params) => { /* ... */ },
  },
    extendApp: (app) => {  /* ... */
  },
  hooks: (req, res) => {
    return {
      beforeCreate: ({ configuration }) => configuration,
      afterCreate: ({ configuration }) => configuration,
      beforeCall: ({ configuration, callName, args }) => args,
      afterCall: ({ configuration, callName, args, response }) => response
    }
  }
}
```

- `name` - defines the unique name of the extension,
- `extendApiMethods` - overrides the original functions from the API-client or adds new ones,
- `extendApp` - gives you access to the express.js app,
- `hooks` - defines lifecycle hooks of API-client,
- `hooks:beforeCreate` - called before API-client creates a connection. It accepts an integration configuration as an argument and must return it as well. You can use it to modify the configuration or merge it with the default values,
- `hooks:afterCreate` - similar to the previous function, but called after the connection has been created. It accepts
  an integration configuration as an argument and must return it as well. This hook is usually used for cleanup work after altering the configuration in `beforeCreate`,
- `hooks:beforeCall` - called before each API-client function. Gives you access to the integration configuration, function name, and arguments. Can be used to modify the arguments based on the input parameters and must return them,
- `hooks:afterCall` - called after each API-client function. Gives you access to the configuration, function name, arguments and response. Can be used to modify the response based on the input parameters and must return it.

See the [ApiClientExtension interface](https://docs.vuestorefront.io/v2/reference/api/core.apiclientextension.html) for more information.

### Registering an extension

To register an extension, add it to the array returned from the `extensions` function of a given integration in
the `middleware.config.js` file:

```js
export const integrations = {
    magento: {
      // ...
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'extension-name',
          hooks: () => { /* ... */ }
        }
      ]
    }
  }
}
```

### Example: Adding new API endpoints

To register a new API endpoint, you can register a custom extension and use the `extendApiMethods` property. API
endpoints cannot be registered directly. Let's look at an example:

```ts
export const integrations = {
    magento: {
      // ...
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'extension-name',
          extendApiMethods: {
            getProductsBySKU: async (context, params) => {
              const response = await context.client.post('/getProductsBySKU', params);
              return response.data;
            }
          }
        }
      ],
    }
}
```

All integrations can be extended, however, this example extends the Magento 2 integration, to give more context about real-life usage. We registered `getProductBySku` in `extendApiMethods` which creates a new `/api/magento/getProductBySku` endpoint.

This method accepts two parameters:

- `context` - integration context which includes:
  - `config` - integration configuration,
  - `client` - API client created in `packages/api-client/src/index.server.ts`,
  - `req` - HTTP request object,
  - `res` - HTTP response object,
  - `extensions` - extensions registered within integration,
  - `customQueries` - custom GraphQL queries registered within integration (used only with GraphQL),
  - `extendQuery` - helper function for handling custom queries (used only with GraphQL).
- `params` - parameters passed in the request's body.

To try it, you can run a simple `curl` command:

```bash
curl '{SERVER_DOMAIN}/api/magento/getProductBySku`' \
  -X POST \
  -H 'content-type: application/json' \
  -d '[{ "id": 1, "name": "John" }]'
```
