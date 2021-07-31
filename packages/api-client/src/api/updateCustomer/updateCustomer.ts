import gql from 'graphql-tag';
import CustomerData from '../../fragments/customerFragment';

export default gql`
  ${CustomerData}
mutation updateCustomer($input: CustomerUpdateInput!) {
  updateCustomerV2(input: $input) {
    customer {
      ...CustomerData
    }
  }
}`;
