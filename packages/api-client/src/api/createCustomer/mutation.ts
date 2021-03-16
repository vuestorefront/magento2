import gql from 'graphql-tag';
import {customerFragment} from '../../fragments';

export default gql`
  mutation($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ${customerFragment}
      }
    }
  }
`;
