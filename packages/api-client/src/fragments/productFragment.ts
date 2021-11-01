import gql from 'graphql-tag';
import ProductThumbnailData from './productThumbnailFragment';
import ProductPriceRangeData from './productPriceRangeFragment';
import ProductUrlFragmentData from './productUrlFragment';
import ProductCategoriesData from './productCategoriesFragment';
import ConfigurableProductOptionsData from './configurableProductOptionsFragment';
import productCustomOptionsFragment from './productCustomOptionsFragment';

export default gql`
  ${ProductThumbnailData}
  ${ProductPriceRangeData}
  ${ProductUrlFragmentData}
  ${ProductCategoriesData}
  ${ConfigurableProductOptionsData}
  ${productCustomOptionsFragment}

fragment ProductData on ProductInterface {
  uid
  __typename
  sku
  name
  stock_status
  only_x_left_in_stock
  rating_summary
  ...ProductThumbnailData
  ...ProductPriceRangeData
  ...ProductUrlFragmentData
  ...ProductCategoriesData
  ...ConfigurableProductOptionsData
  ...ProductCustomOptionsFragment
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
}`;
