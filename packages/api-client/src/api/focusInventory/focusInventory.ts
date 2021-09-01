import gql from 'graphql-tag';

export default gql`
query focusInventory($filter: FocusInventoryFilterInput) {
  focusInventory(filter: $filter) {
    items {
      sku
      salable_qty
      manage_stock
      is_backorder
      is_preorder
      custom_stock_status
      sources {
        sku
        source_code
        quantity
        status
      }
    }
  }
  cacheTags @client
}`;
