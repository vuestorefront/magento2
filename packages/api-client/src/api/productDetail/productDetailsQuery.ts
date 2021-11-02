import gql from 'graphql-tag';

export default gql`
  query productDetails(
    $search: String = "",
    $filter: ProductAttributeFilterInput,
    $pageSize: Int = 10,
    $currentPage: Int = 1,
    $sort: ProductAttributeSortInput
    $configurations: [ID!]
  ) {
    products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
      items {
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
        rating_summary
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
        small_image {
          url
          position
          disabled
          label
        }
        image {
          url
          position
          disabled
          label
        }
        media_gallery {
          url
          position
          disabled
          label
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
        meta_description
        meta_keyword
        meta_title
        description {
          html
        }
        short_description {
          html
        }
        options_container
        special_to_date
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
        ... on ConfigurableProduct {
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
        ... on DownloadableProduct {
          downloadable_product_samples {
            sample_url
            title
          }
          downloadable_product_links {
            id
            price
            title
            uid
          }
        }
        ... on VirtualProduct {
          gift_message_available
          product_links {
            link_type
            linked_product_sku
            linked_product_type
            position
            sku
          }
        }
      }
    }
  }
`;
