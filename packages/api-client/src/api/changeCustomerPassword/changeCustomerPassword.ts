import gql from 'graphql-tag';
import CustomerData from '../../fragments/customerFragment';

export default gql`
  ${CustomerData}
mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
  changeCustomerPassword(
    currentPassword: $currentPassword
    newPassword: $newPassword
  ) {
    ...CustomerData
  }
}`;
