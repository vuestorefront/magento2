import gql from 'graphql-tag';

export default gql`
  mutation createCustomer($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        firstname
        lastname
        email
      }
    }
    cacheId @client
  }
`;
