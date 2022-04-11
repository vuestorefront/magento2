import gql from 'graphql-tag';

/** GraphQL Mutation that deletes a customer address. */
export default gql`
  mutation deleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;
