import gql from 'graphql-tag';

export default gql`
mutation createPaypalExpressToken($input: PaypalExpressTokenInput!) {
  createPaypalExpressToken(input: $input) {
    token
    paypal_urls {
      start
      edit
    }
  }
}`;
