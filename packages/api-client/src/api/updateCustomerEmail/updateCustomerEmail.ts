import gql from 'graphql-tag';
import customerFragment from '../../fragments/customerFragment';

export default gql`
  mutation updateCustomerEmail($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password){
      customer {
        ${customerFragment}
      }
    }
  }
`;
