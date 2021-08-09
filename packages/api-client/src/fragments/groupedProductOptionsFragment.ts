import gql from 'graphql-tag';
import ProductData from './productFragment';
import ProductImagesData from './productImageFragment';
import ProductPriceRangeData from './productPriceRangeFragment';
import ProductThumbnailData from './productThumbnailFragment';

export default gql`
  ${ProductData}
  ${ProductImagesData}
  ${ProductPriceRangeData}
  ${ProductThumbnailData}
  
  fragment GroupedProductOptionsData on GroupedProduct {
    items {
      position
      qty
      product {
      ...ProductData
      ...ProductPriceRangeData
      ...ProductImagesData
      ...ProductThumbnailData
    }
    }
  }
`;
