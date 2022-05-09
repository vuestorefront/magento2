export default {
  __typename: 'GroupedProduct',
  price_range: {
    __typename: 'PriceRange',
    maximum_price: {
      __typename: 'ProductPrice',
      final_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 14,
      },
      regular_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 14,
      },
    },
    minimum_price: {
      __typename: 'ProductPrice',
      final_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 14,
      },
      regular_price: {
        __typename: 'Money',
        currency: 'USD',
        value: 14,
      },
    },
  },
  items: [
    {
      __typename: 'GroupedProductItem',
      position: 0,
      qty: 1,
      product: {
        price_range: {
          __typename: 'PriceRange',
          maximum_price: {
            __typename: 'ProductPrice',
            final_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 14,
            },
            regular_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 14,
            },
          },
          minimum_price: {
            __typename: 'ProductPrice',
            final_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 14,
            },
            regular_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 14,
            },
          },
        },
      },
    },
    {
      __typename: 'GroupedProductItem',
      position: 1,
      qty: 1,
      product: {
        price_range: {
          __typename: 'PriceRange',
          maximum_price: {
            __typename: 'ProductPrice',
            final_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 17,
            },
            regular_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 17,
            },
          },
          minimum_price: {
            __typename: 'ProductPrice',
            final_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 17,
            },
            regular_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 17,
            },
          },
        },
      },
    },
    {
      __typename: 'GroupedProductItem',
      position: 2,
      qty: 1,
      product: {
        price_range: {
          __typename: 'PriceRange',
          maximum_price: {
            __typename: 'ProductPrice',
            final_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 21,
            },
            regular_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 21,
            },
          },
          minimum_price: {
            __typename: 'ProductPrice',
            final_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 21,
            },
            regular_price: {
              __typename: 'Money',
              currency: 'USD',
              value: 21,
            },
          },
        },
      },
    },
  ],
};
