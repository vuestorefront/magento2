import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
mutation createCompareList($input: CreateCompareListInput) {
  createCompareList(input: $input) {
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
