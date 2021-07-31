import gql from 'graphql-tag';

export default gql`
fragment ShipmentItemData on ShipmentItemInterface {
  id
  product_name
  product_sale_price {
    currency
    value
  }
  product_sku
  quantity_shipped
}`;
