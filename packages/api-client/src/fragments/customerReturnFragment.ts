export default `
uid
number
created_at
status
order {
  number
}
items {
  uid
  order_item {
    product_sku
    product_name
    product_sale_price {
      currency
      value
    }
    focus_price_with_tax_and_discount {
      currency
      value
    }
    focus_child_items {
      item_uid
      item_type
    }
    focus_parent_item_uid
    focus_child_type
    focus_can_add_to_rma_without_parent
  }
  custom_attributes {
    label
    value
  }
  reason
  request_quantity
  quantity
  sellercloud_resolutions
}
customer {
  email
  firstname
  lastname
}
shipping {
  address {
    street
    city
    region {
      code
      name
    }
    postcode
    country {
      full_name_english
      full_name_locale
      id
      three_letter_abbreviation
      two_letter_abbreviation
    }
    telephone
  }
}
comments {
  uid
  created_at
  author_name
  text
}
labels {
  skus
  download_url
  label_uid
}
`;
