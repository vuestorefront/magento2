import gql from 'graphql-tag';
import ConfigurableProductOptionsData from '../../fragments/configurableProductOptionsFragment';
import ProductPriceRangeData from '../../fragments/productPriceRangeFragment';

export default gql`
  ${ConfigurableProductOptionsData}
  ${ProductPriceRangeData}
query configurableProductDetail($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput, $configurations: [ID!] ) {
  products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
    items {
      uid
      ...ConfigurableProductOptionsData
      ... on ConfigurableProduct {
        configurable_product_options_selection(configurableOptionValueUids: $configurations) {
          options_available_for_selection {
            attribute_code
            option_value_uids
          }
          media_gallery {
            disabled
            label
            position
            url
          }
          variant {
            uid
            sku
            name
            ...ProductPriceRangeData
          }
        }
      }
    }
  }
}`;
