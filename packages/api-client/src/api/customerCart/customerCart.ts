import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
query customerCart {
  customerCart {
    ...CompleteCartData
  }
}`;
