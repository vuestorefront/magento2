import gql from 'graphql-tag';

export default gql`
fragment ProductPriceTierData on ProductInterface {
  price_tiers {
    quantity
    discount {
      amount_off
      percent_off
    }
    final_price {
      currency
      value
    }
  }
}`;
