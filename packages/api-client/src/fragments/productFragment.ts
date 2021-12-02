import baseProductFragment from './baseProductFragment';

export default `
${baseProductFragment}
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
`;
