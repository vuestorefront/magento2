import baseProductFragment from './baseProductFragment';
import freeGiftRuleFragment from './freeGiftRuleFragment';

export default `
${baseProductFragment}
pdp_data
free_gift_data {
  ${freeGiftRuleFragment}
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
  ... on ProductVideo {
    video_content {
      media_type
      video_provider
      video_url
      video_title
      video_description
      video_metadata
    }
  }
}
meta_description
meta_keyword
meta_title
description {
  html
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
focus_parent_configurable {
  product {
    uid
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
      variants {
        attributes {
          uid
          label
          code
          value_index
        }
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
          thumbnail {
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
            ... on ProductVideo {
              video_content {
                media_type
                video_provider
                video_url
                video_title
                video_description
                video_metadata
              }
            }
          }
          short_description {
            html
          }
          url_key
          url_rewrites {
            url
            parameters {
              name
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
`;
