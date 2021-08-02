import gql from 'graphql-tag';
import CategoryData from '../../fragments/categoryDataFragment';
import CategoryUrlData from '../../fragments/categoryUrlData';

export default gql`
  ${CategoryData}
  ${CategoryUrlData}
  
query categorySearch($filters: CategoryFilterInput) {
  categoryList(filters: $filters) {
    ...CategoryData
    ...CategoryUrlData
  }
}`;
