import gql from 'graphql-tag';
import ProductData from './productFragment';

export default gql`
  ${ProductData}
  
  fragment CartProductData on CartItemInterface {
  uid
  product {
    ...ProductData
  }
  prices {
    row_total {
      value
    }
    row_total_including_tax {
      value
    }
    total_item_discount {
      value
    }
  }
  quantity
}`;
