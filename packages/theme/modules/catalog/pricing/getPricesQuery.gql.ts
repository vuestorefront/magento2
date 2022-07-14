export default `
  query productsList($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
      items {
        sku
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
`;
