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
