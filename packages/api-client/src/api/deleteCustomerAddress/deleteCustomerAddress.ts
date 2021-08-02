import gql from 'graphql-tag';

export default gql`
mutation deleteCustomerAddress($id: Int!) {
  deleteCustomerAddress(id: $id)
}`;
