export default `
__typename
uid
sku
name
stock_status
only_x_left_in_stock
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
short_description {
  html
}
options_container
special_to_date
`;
