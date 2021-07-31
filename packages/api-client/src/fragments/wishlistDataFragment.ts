import gql from 'graphql-tag';
import ConfigurableProductOptionsData from './configurableProductOptionsFragment';
import ProductCategoriesData from './productCategoriesFragment';
import ProductPriceRangeData from './productPriceRangeFragment';
import ProductThumbnailData from './productThumbnailFragment';
import ProductUrlFragmentData from './productUrlFragment';

export default gql`
  ${ConfigurableProductOptionsData}
  ${ProductCategoriesData}
  ${ProductPriceRangeData}
  ${ProductThumbnailData}
  ${ProductUrlFragmentData}

  fragment WishlistData on Wishlist {
  id
  items_count
  sharing_code
  items_v2 {
    items {
      id
      quantity
      description
      added_at
      product {
        uid
        __typename
        sku
        name
        stock_status
        only_x_left_in_stock
        rating_summary
        ...ConfigurableProductOptionsData
        ...ProductCategoriesData
        ...ProductPriceRangeData
        ...ProductThumbnailData
        ...ProductUrlFragmentData
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
    }
    page_info {
      current_page
      page_size
      total_pages
    }
  }
}`;
