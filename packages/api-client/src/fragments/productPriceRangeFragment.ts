import gql from 'graphql-tag';

export default gql`
fragment ProductPriceRangeData on ProductInterface {
  price_range {
    maximum_price {
      final_price {
        currency
        value
      }
      regular_price {
        currency
        value
      }
    }
    minimum_price {
      final_price {
        currency
        value
      }
      regular_price {
        currency
        value
      }
    }
  }
}`;
