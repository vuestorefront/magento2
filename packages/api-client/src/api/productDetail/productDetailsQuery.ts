import gql from 'graphql-tag';
import ProductData from '../../fragments/productFragment';
import ProductGalleryData from '../../fragments/productGalleryFragment';
import ProductImagesData from '../../fragments/productImageFragment';
import ProductPriceRangeData from '../../fragments/productPriceRangeFragment';
import ProductThumbnailData from '../../fragments/productThumbnailFragment';
import ProductUrlFragmentData from '../../fragments/productUrlFragment';

export default gql`
  ${ProductData}
  ${ProductGalleryData}
  ${ProductImagesData}
  ${ProductPriceRangeData}
  ${ProductThumbnailData}
  ${ProductUrlFragmentData}
query productDetails($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
  products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
    items {
      options_container
      meta_description
      meta_keyword
      meta_title
      description {
        html
      }
      short_description {
        html
      }
      ...ProductData
      ...ProductPriceRangeData
      ...ProductImagesData
      ...ProductGalleryData
      ...ProductThumbnailData
      ...ProductUrlFragmentData
    }
  }
}`;
