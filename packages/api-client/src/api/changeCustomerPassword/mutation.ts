import gql from 'graphql-tag';
import {customerFragment} from '../../fragments';

export default gql`
  mutation($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      ${customerFragment}
    }
  }
`;
