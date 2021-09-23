import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
query compareList($uid: ID!) {
  compareList(uid: $uid) {
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
}`;
