import gql from 'graphql-tag';
import customerFragment from '../../fragments/customerFragment';

export default gql`
  mutation updateCustomer($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        ${customerFragment}
      }
    }
    cacheId @client
  }
`;
