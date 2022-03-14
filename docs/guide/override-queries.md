# Override default queries

To override one or multiple queries without creating a custom composable for each usage, you can override the defaults ones with the `customQueries` attribute in the `middleware.config.js`file. 

## Examples

Below is the example on how to override the default query for `productList`.

### Overriding query

In this example we will override `products` query by adding `cld_data` field that will retrieve Cloudinary image data from Magento.

::: warning
In order to query `cld_data`, you need to have [Cloudinary Magento extension](https://cloudinary.com/documentation/magento_integration) installed in your Magento project.
:::

---

1. Inside the theme's root let's create a `customQueries` directory, and [copy the content of the default `productsList` query from `vuestorefront/magento2/packages/api-client/src/api/products/productsList.ts` file](https://github.com/vuestorefront/magento2/blob/main/packages/api-client/src/api/products/productsList.ts) into the newly created directory. 

  You can modify the query inside this file by adding `cld_data` with fields to the existing query as below:

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
          //...
          cld_data {
            image
            thumbnail
          }
          //...
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
  
  ::: warning
  Make sure you have `graphgl-tag` installed as dependency prior using this sample code.
  :::

2. In `middleware.config.js`, import the modified query

  ```js
  import customProductsQuery from './customQueries/productList';
  ```

3.  Add a new property field `customQueries` under `integrations.magento` with the following code:
  
  ```js
    module.exports = {
      integrations: {
        magento: {
          customQueries: {
            /* This is where we override the default query */
            products: (context) => ({ 
              ...context,
              query: customProductsQuery,  // Your custom query
            })
          },
          //...
        },
      },
    };
   ```

4. Now you can restart your dev environment and view the updated data queried.

:::warning
`thumbnail` is a must-have field to query. It is used for our default image rendering (for Nuxt image). DO NOT remove it from the query in any circumstance.
:::

### Important notes

**Only** attributes presented on `ProductInterface` are accessible via GraphQL without any additional modification on the Magento side. 

To be able to get any custom attributes you must extend GraphQL schema in the Magento2. Follow [Magento 2 documentation](https://devdocs.magento.com/guides/v2.4/graphql/develop/extend-existing-schema.html) to achieve that.
