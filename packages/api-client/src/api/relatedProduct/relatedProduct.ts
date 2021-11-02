import gql from 'graphql-tag';

export default gql`
  query relatedProduct(
    $search: String = ""
    $filter: ProductAttributeFilterInput
    $pageSize: Int = 10
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        related_products {
          uid
    __typename
    sku
    name
    stock_status
    only_x_left_in_stock
    rating_summary
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
        }
        uid
      }
    }
  }
`;
