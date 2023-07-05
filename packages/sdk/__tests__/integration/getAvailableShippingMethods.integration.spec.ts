import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID } from './__config__/jest.const';

describe(describeGroup('getAvailableShippingMethods'), () => {
  it("fetches guest's available shipping methods", async () => {
    const expected = expect.objectContaining({
      data: expect.objectContaining({
        cart: expect.objectContaining({
          __typename: 'Cart',
          shipping_addresses: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'ShippingCartAddress',
              available_shipping_methods: expect.arrayContaining([
                expect.objectContaining({
                  __typename: 'AvailableShippingMethod',
                }),
              ]),
            }),
          ]),
        }),
      }),
    });

    const result = await sdk.magento.getAvailableShippingMethods({
      cart_id: TEST_CART_ID,
    });

    expect(result).toEqual(expected);
  });

  it("fetches guest's available shipping methods using custom queries", async () => {
    const expected = expect.objectContaining({
      data: expect.objectContaining({
        cart: expect.objectContaining({
          __typename: 'Cart',
          shipping_addresses: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'ShippingCartAddress',
              available_shipping_methods: expect.arrayContaining([
                expect.objectContaining({
                  __typename: 'AvailableShippingMethod',
                  method_title: expect.any(String),
                }),
              ]),
            }),
          ]),
        }),
      }),
    });
    const customQuery = {
      shippingMethods: 'get-available-shipping-methods-custom-query',
      metadata: {
        fields: 'method_title',
      },
    };

    const result = await sdk.magento.getAvailableShippingMethods(
      {
        cart_id: TEST_CART_ID,
      },
      { customQuery },
    );

    expect(result).toEqual(expected);
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.cart?.shipping_addresses?.[0]?.available_shipping_methods?.[0]?.carrier_title).toBeUndefined();
  });
});
