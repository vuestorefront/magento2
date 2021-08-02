import gql from 'graphql-tag';
import CustomerData from '../../fragments/customerFragment';

export default gql`
  ${CustomerData}
mutation updateCustomerEmail($email: String!, $password: String!) {
  updateCustomerEmail(email: $email, password: $password){
    customer {
      ...CustomerData
    }
  }
}`;
