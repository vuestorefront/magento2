import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
query customerCompareList {
  customer {
    compare_list {
      uid
      item_count
      attributes {
        code
        label
      }
      items {
        uid
        attributes {
          code
          value
        }
        product {
          ${productFragment}
        }
      }
    }
  }
}`;
