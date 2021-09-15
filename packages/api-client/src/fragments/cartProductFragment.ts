import gql from 'graphql-tag';
import BaseProductData from './baseProductFragment';

export default gql`
  ${BaseProductData}
  
  fragment CartProductData on CartItemInterface {
  uid
  product {
    ...BaseProductData
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
