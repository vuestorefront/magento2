export const productFragment = `
  id
  type_id
  sku
  name
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
  categories {
      id
      name
      url_suffix
      url_path
      breadcrumbs {
          category_name,
          category_url_path
      }
  }
`;

export const cartFragment = `
  id
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
  billing_address {
    firstname
    lastname
    street
    city
    postcode
    telephone
    country {
      code
      label
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
  addresses {
    firstname
    lastname
    street
    city
    region {
      region_code
      region
    }
    postcode
    country_code
    telephone
  }
`;

export const categoryDataFragment = `
  canonical_url
  image
  include_in_menu
  is_anchor
  level
  name
  path
  path_in_store
  position
  uid
`;

export const categoryUrlData = `
  url_key
  url_path
  url_suffix
`;
