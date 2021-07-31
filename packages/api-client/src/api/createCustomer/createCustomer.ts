import gql from 'graphql-tag';
import CustomerData from '../../fragments/customerFragment';

export default gql`
  ${CustomerData}
  
mutation createCustomer($input: CustomerCreateInput!) {
  createCustomerV2(input: $input) {
    customer {
      ...CustomerData
    }
  }
}`;
