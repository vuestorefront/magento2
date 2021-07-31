import gql from 'graphql-tag';

export default gql`
fragment InvoiceItemData on InvoiceItemInterface {
  discounts {
    amount {
      currency
      value
    }
    label
  }
  id
  product_name
  product_sale_price {
    currency
    value
  }
  product_sku
  quantity_invoiced
}`;
