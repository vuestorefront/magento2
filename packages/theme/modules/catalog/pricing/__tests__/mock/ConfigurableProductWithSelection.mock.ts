export default {
  __typename: 'ConfigurableProduct',
  price_range: {
    __typename: 'PriceRange',
    maximum_price: {
      __typename: 'ProductPrice',
      final_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 45,
      },
      regular_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 45,
      },
    },
    minimum_price: {
      __typename: 'ProductPrice',
      final_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 20,
      },
      regular_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 20,
      },
    },
  },
  configurable_product_options_selection: {
    __typename: 'ConfigurableProductOptionsSelection',
    variant: {
      __typename: 'SimpleProduct',
      uid: 'MjAzOQ==',
      sku: 'WSH12-30-Red',
      name: 'Erika Running Short-30-Red',
      price_range: {
        __typename: 'PriceRange',
        maximum_price: {
          __typename: 'ProductPrice',
          final_price: {
            __typename: 'Money',
            currency: 'USD',
            value: 45,
          },
          regular_price: {
            __typename: 'Money',
            currency: 'USD',
            value: 45,
          },
        },
        minimum_price: {
          __typename: 'ProductPrice',
          final_price: {
            __typename: 'Money',
            currency: 'USD',
            value: 45,
          },
          regular_price: {
            __typename: 'Money',
            currency: 'USD',
            value: 45,
          },
        },
      },
    },
  },
};
