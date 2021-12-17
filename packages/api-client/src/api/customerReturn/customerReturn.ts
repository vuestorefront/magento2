import gql from 'graphql-tag';
import CustomerReturnFragment from '../../fragments/customerReturnFragment';

export default gql`
  query customerReturns($uid: ID!) {
    customer {
      return (uid: $uid) {
        ${CustomerReturnFragment}
      }
    }
  }
`;
