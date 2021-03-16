import gql from 'graphql-tag';

export default gql`
  mutation {
    revokeCustomerToken {
      result
    }
  }
`;
