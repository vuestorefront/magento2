import gql from 'graphql-tag';

const fragmentPriceRangeFields = gql`
  fragment PriceRangeFields on PriceRange {
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
`;

export default gql`
  query getProductPriceBySku($sku: String) {
    products(filter: {sku: {eq: $sku}}) {
      items {
        __typename
        sku
        price_range {
          ...PriceRangeFields
        }

        ... on GroupedProduct {
          items {
            position
            qty
            product {
              uid
              sku
              name
              stock_status
              only_x_left_in_stock
              thumbnail {
                url
                position
                disabled
                label
              }
              price_range {
                ...PriceRangeFields
              }
            }
          }
        }
      }
    }
  }
  ${fragmentPriceRangeFields}
`;
