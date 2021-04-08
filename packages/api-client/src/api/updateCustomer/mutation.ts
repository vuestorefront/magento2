import gql from 'graphql-tag';
import { customerFragment } from '../../fragments';

export default gql`
  mutation($input: CustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        ${customerFragment}
      }
    }
  }
`;
