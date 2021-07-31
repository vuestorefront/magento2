import gql from 'graphql-tag';

export default gql`
fragment InvoiceTotalData on InvoiceTotal {
  discounts {
    amount {
      currency
      value
    }
    label
  }
  base_grand_total {
    currency
    value
  }
  shipping_handling {
    amount_excluding_tax {
      currency
      value
    }
    amount_including_tax {
      currency
      value
    }
    discounts {
      amount {
        currency
        value
      }
    }
    taxes {
      amount{
        currency
        value
      }
      rate
      title
    }
    total_amount {
      currency
      value
    }
  }
  subtotal {
    currency
    value
  }
  taxes {
    amount {
      currency
      value
    }
    rate
    title
  }
  total_shipping {
    currency
    value
  }
  total_tax {
    currency
    value
  }
}`;
