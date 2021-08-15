import gql from 'graphql-tag';

export default gql`
  query bundleProductDetail($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        uid
        ... on BundleProduct {
          items {
            position
            __typename
            required
            sku
            title
            type
            uid
            options {
              __typename
              can_change_quantity
              is_default
              position
              uid
              product {
                uid
                sku
                name
                stock_status
                only_x_left_in_stock
                price_range {
                  maximum_price {
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                  minimum_price {
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
