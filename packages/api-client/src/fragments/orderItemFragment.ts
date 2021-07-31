import gql from 'graphql-tag';

export default gql`
fragment OrderItemData on OrderItemInterface {
  discounts {
    amount {
      currency
      value
    }
    label
  }
  entered_options {
    label
    value
  }
  id
  product_name
  product_sale_price {
    currency
    value
  }
  product_sku
  product_type
  product_url_key
  quantity_canceled
  quantity_invoiced
  quantity_ordered
  quantity_refunded
  quantity_returned
  quantity_shipped
  selected_options {
    label
    value
  }
  status
}`;
