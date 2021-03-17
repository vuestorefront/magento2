import gql from 'graphql-tag';

export default gql`
  query customer {
    customerOrders {
      items {
        order_number
        id
        created_at
        grand_total
        status
      }
    }
  }
`;
