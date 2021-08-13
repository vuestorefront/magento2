import gql from 'graphql-tag';

export default gql`
  query groupedProductDetail($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        uid
        ... on GroupedProduct {
          items {
            position
            qty
            product {
              uid
              __typename
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
              thumbnail {
                url
                position
                disabled
                label
              }
            }
          }
        }
      }
    }
  }
`;
