export const productFragment = `
  id
  type_id
  sku
  name
  stock_status
  only_x_left_in_stock
  description {
    html
  }
  short_description {
    html
  }
  categories {
    id
  }
  price_range {
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
  }
  image {
    url
  }
  thumbnail {
    url
  }
  url_rewrites {
    url
    parameters {
      name
      value
    }
  }
`;

export const cartFragment = `
  id
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
  shipping_addresses {
    selected_shipping_method {
      amount {
        currency
        value
      },
      carrier_code
      method_code,
      carrier_title
      method_title
    }
  }
  items {
    id
    product {
        ${productFragment}
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
    ... on ConfigurableCartItem {
      configurable_options {
         id
         value_id,
         option_label
         value_label
      }
    }
    quantity
  }
  total_quantity
`;

export const customerFragment = `
  email
  firstname
  is_subscribed
  lastname
  middlename
  prefix
  suffix
  taxvat
  default_billing
  default_shipping
`;
