import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID } from './__config__/jest.const';

const SHARED_PARAMS = {
  cart_id: TEST_CART_ID,
  payment_method: {
    code: 'checkmo',
  },
};

describe(describeGroup('setPaymentMethodOnCart'), () => {
  it('should set payment method on the cart', async () => {
    const result = await sdk.magento.setPaymentMethodOnCart(SHARED_PARAMS);
    const expectedResult = {
      data: {
        setPaymentMethodOnCart: {
          __typename: 'SetPaymentMethodOnCartOutput',
          cart: {
            __typename: 'Cart',
            available_payment_methods: [
              {
                __typename: 'AvailablePaymentMethod',
                code: 'checkmo',
                title: 'Check / Money order',
              },
            ],
            selected_payment_method: {
              __typename: 'SelectedPaymentMethod',
              code: 'checkmo',
              title: 'Check / Money order',
            },
          },
        },
      },
    };

    expect(result).toMatchObject(expectedResult);
  });

  it('should return error if payment method is not available', async () => {
    const { errors } = await sdk.magento.setPaymentMethodOnCart({
      cart_id: TEST_CART_ID,
      payment_method: {
        code: 'invalid',
      },
    });

    expect(errors).toHaveLength(1);
  });

  it('can use custom query to change the requested data', async () => {
    const customQuery = {
      setPaymentMethodOnCart: 'set-payment-method-on-cart-custom-query',
      metadata: {
        fields: 'available_payment_methods { code title }',
      },
    };

    const result = await sdk.magento.setPaymentMethodOnCart(SHARED_PARAMS, { customQuery });

    // Expected result reduced to only contain available_payment_methods
    const expectedResult = {
      data: {
        setPaymentMethodOnCart: {
          __typename: 'SetPaymentMethodOnCartOutput',
          cart: {
            __typename: 'Cart',
            available_payment_methods: [
              {
                __typename: 'AvailablePaymentMethod',
                code: 'checkmo',
                title: 'Check / Money order',
              },
            ],
          },
        },
      },
    };

    expect(result).toStrictEqual(expectedResult);
  });
});
