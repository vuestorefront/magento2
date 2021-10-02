import gql from 'graphql-tag';

export default gql`
  mutation addProductsToWishlist($id: ID!, $items: [WishlistItemInput!]!) {
    addProductsToWishlist(wishlistId: $id, wishlistItems: $items) {
      wishlist {
        id
        items_count
        sharing_code
        items_v2 {
          items {
            id
            quantity
            description
            added_at
            product {
              ...on ConfigurableProduct {
                configurable_options {
                  attribute_code
                  attribute_uid
                  label
                  position
                  uid
                  use_default
                  values {
                    label
                    swatch_data {
                      value
                    }
                    uid
                  }
                }
              }
              ... on BundleProduct {
                items {
                  sku
                  title
                  options {
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
              uid
              __typename
              sku
              name
              stock_status
              only_x_left_in_stock
              rating_summary
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
              url_key
              url_rewrites {
                url
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
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }`;
