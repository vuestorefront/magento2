import baseProductFragment from './baseProductFragment';
import freeGiftRuleFragment from './freeGiftRuleFragment';

export default `
${baseProductFragment}
pdp_data
kit_components {
  main
  qty
  product {
    ${baseProductFragment}
    description {
      html
    }
    in_box
  }
}
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
focus_attribute_groups {
  uid
  attribute_group_name
  sort_order
  attributes {
    attribute_code
    frontend_label
    position
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
`;
