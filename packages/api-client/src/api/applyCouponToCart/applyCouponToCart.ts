import gql from 'graphql-tag';

export default gql`
  mutation applyCouponToCart($input: ApplyCouponToCartInput) {
    applyCouponToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_excluding_tax {
            value
          },
          subtotal_including_tax {
            value
          },
          applied_taxes {
            amount {
              value
            },
            label
          }
          discounts {
            amount {
              value
            },
            label
          }
          grand_total {
            value
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
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
            categories {
              uid
              name
              url_suffix
              url_path
              breadcrumbs {
                category_name,
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
            }
            row_total_including_tax {
              value
            }
            total_item_discount {
              value
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }`;
