import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
mutation assignCompareListToCustomer($uid: ID!) {
  assignCompareListToCustomer(uid: $uid) {
    result
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
