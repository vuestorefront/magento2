import gql from 'graphql-tag';
import CategoryData from '../../fragments/categoryDataFragment';
import CategoryUrlData from '../../fragments/categoryUrlData';

export default gql`
  ${CategoryData}
  ${CategoryUrlData}
  
query categoryList {
  categories {
    items {
      children {
        ...CategoryData
        ...CategoryUrlData
        children {
          ...CategoryData
          ...CategoryUrlData
        }
      }
      product_count
      name
      uid
    }
  }
}`;
