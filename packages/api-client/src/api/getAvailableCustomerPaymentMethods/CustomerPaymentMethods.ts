import gql from 'graphql-tag';

export default gql`
query CustomerAvailablePaymentMethods {
  customerCart {
    available_payment_methods {
      code
      title
    }
  }
}`;
