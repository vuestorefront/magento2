import cartAddressFragment from './cartAddressFragment';
import cartPricesFragment from './cartPricesFragment';
import productFragment from './productFragment';

export default `
id
email
is_virtual
applied_coupons {
  code
}
prices {
  ${cartPricesFragment}
}
items {
  uid
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
  ${cartAddressFragment}
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
  ${cartAddressFragment}
}
selected_payment_method {
  code
  title
}
`;
