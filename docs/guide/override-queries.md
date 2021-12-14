# Override queries

To override one or multiple queries without creating a custom composable for each usage, you can override the defaults ones with the `customQueries` attribute in the `middleware.config.js`file.

## Examples

```js
const config = require('./config.js');
const cookieNames = require('./enums/cookieNameEnum');
import gql from 'graphql-tag';

module.exports = {
  integrations: {
    magento: {
      customQueries: {
        /********************** 
        ** HERE : use the default query key to override it.
        ***********************/
        'products': ({ query, variables, metadata }) => {
          query = gql`
            ... 
          `;
          return { query, variables }
        }
      },
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: config.get('magentoGraphQl'),
        cookies: {
          ...cookieNames,
        },
        defaultStore: 'default',
        externalCheckout: {
          enable: config.get('enableMagentoExternalCheckout'),
          cmsUrl: config.get('externalCheckoutUrl'),
          syncUrlPath: config.get('externalCheckoutSyncPath'),
          stores: {
            default: config.get('enableMagentoExternalCheckout'),
          },
        },
        tax: {
          displayCartSubtotalIncludingTax: true,
        },
        facets: {
          available: ['color', 'size', 'price'],
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: false,
        },
      },
    },
  },
};


```

