import gql from 'graphql-tag';

export default gql`
query giftCardAccount($input: GiftCardAccountInput!) {
  giftCardAccount(input: $input) {
    code
    balance {
      currency
      value
    }
    expiration_date
  }
}`;
