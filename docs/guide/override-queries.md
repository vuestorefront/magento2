# Override default queries

To override one or multiple queries without creating a custom composable for each usage, you can override the defaults ones with the `customQueries` attribute in the `middleware.config.js`file.

## Examples

### Overriding query
In this example we will override `products` query by adding `image` field and one `custom_attribute`.

---
Because queries can be long so it will be best to keep all custom queries in a dedicated directory.
Inside the theme's root create `customQueries` directory, then copy `productList.ts` file from api-client lib into the created directory. Now you can easily modify the query inside your custom queries catalog. As we wanted to add `image` and `custom_attribute`file after the modification will look like the following example:
```typescript
import gql from 'graphql-tag';

export default gql`
  query productsList($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
      aggregations {
        attribute_code
        label
        options {
          label
          value
          count
        }
      }
      items {
        ...
        image {
          url
          position
          disabled
          label
        }
        custom_attribute
        ...
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;

```

Once you prepared custom query you must register it so the application will know where it is and how to use it. Inside the theme's `middleware.config.js`, under `integrations.magento` add `customQueries` field. Import your custom query and configure it as in the following example:

```js
import customProductsQuery from './customQueries/productList';

const config = require('./config.js');
const cookieNames = require('./enums/cookieNameEnum');

module.exports = {
  integrations: {
    magento: {
      customQueries: {
        /** ********************
         ** HERE : use the default query key to override it.
         ********************** */
        products: ({ query, variables }) => {
          return { query: customProductsQuery, variables }; // Your custom query
        },
      },
      ...
    },
  },
};

### Important notes

**Only** attributes presented on `ProductInterface` are accessible via GraphQL without any additional modification on the Magento side.

**Important**

Keep in mind that only attributes present on `ProductInterface` are accessible via GraphQL without any additional modification on the Magento side. To be able to get any custom attributes you must extend GraphQL schema in the Magento2. Follow [Magento 2 documentation](https://devdocs.magento.com/guides/v2.4/graphql/develop/extend-existing-schema.html) to achieve that.


