const fragmentPriceRangeFields = `
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

export default `
  query getProductPriceBySku($sku: String) {
    products(filter: {sku: {eq: $sku}}) {
      items {
        price_range {
          ...PriceRangeFields
        }

        ... on BundleProduct {
          items {
            position
            required
            sku
            title
            type
            uid
            options {
              can_change_quantity
              is_default
              position
              uid
              quantity
              product {
                uid
                sku
                name
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
  ${fragmentPriceRangeFields}
`;
