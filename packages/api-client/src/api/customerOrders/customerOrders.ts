import gql from 'graphql-tag';
import InvoiceItemData from '../../fragments/invoiceItemFragment';
import InvoiceTotalData from '../../fragments/invoiceTotalFragment';
import OrderAddressData from '../../fragments/orderAddressFragment';
import OrderItemData from '../../fragments/orderItemFragment';
import OrderTotalData from '../../fragments/orderTotalFragment';
import ShipmentItemData from '../../fragments/shipmentItemFragment';

export default gql`
  ${InvoiceItemData}
  ${InvoiceTotalData}
  ${OrderAddressData}
  ${OrderItemData}
  ${OrderTotalData}
  ${ShipmentItemData}
  
query customerOrders($currentPage: Int = 1, $filter: CustomerOrdersFilterInput = {}, $pageSize: Int = 20) {
  customer {
    orders(currentPage: $currentPage, filter: $filter, pageSize: $pageSize) {
      items {
        order_number
        id
        created_at
        grand_total
        total {
          ...OrderTotalData
        }
        status
        comments {
          message
          timestamp
        }
        invoices {
          comments {
            message
            timestamp
          }
          id
          items {
            ...InvoiceItemData
          }
          number
          total {
            ...InvoiceTotalData
          }
        }
        items {
          ...OrderItemData
        }
        payment_methods {
          name
          type
          additional_data {
            name
            value
          }
        }
        shipments {
          comments {
            message
            timestamp
          }
          id
          number
          tracking {
            carrier
            number
            title
          }
          items {
            ...ShipmentItemData
          }
        }
        shipping_address {
          ...OrderAddressData
        }
        shipping_method
      }
    }
  }
}`;
