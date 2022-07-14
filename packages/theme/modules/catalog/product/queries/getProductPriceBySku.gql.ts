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
  query getProductPriceBySku(
    $filter: ProductAttributeFilterInput,
    $configurations: [ID!]
  ) {
    products(filter: $filter) {
      items {
        price_range {
          ...PriceRangeFields
        }

        ... on ConfigurableProduct {
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

          configurable_product_options_selection(configurableOptionValueUids: $configurations) {
            options_available_for_selection {
              attribute_code
              option_value_uids
            }
            media_gallery {
              disabled
              label
              position
              url
            }
            variant {
              uid
              sku
              name
              price_range {
                ...PriceRangeFields
              }
            }
          }
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
                   ...PriceRangeFields
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
