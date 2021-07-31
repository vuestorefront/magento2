import gql from 'graphql-tag';

export default gql`
mutation generateCustomerToken($email: String!, $password: String!) {
  generateCustomerToken(email: $email, password: $password) {
    token
  }
}`;
