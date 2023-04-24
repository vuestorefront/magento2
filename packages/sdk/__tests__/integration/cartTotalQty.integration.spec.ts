import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID } from './__config__/jest.const';

describe(describeGroup('cartTotalQty'), () => {
  it('it should return cart response with total qty only', async () => {
    const result = await sdk.magento.cartTotalQty({ cartId: TEST_CART_ID });

    // Strict check because fields are limited to total_quantity
    const expected = { data: { cart: { __typename: 'Cart', total_quantity: 1 } }, loading: false, networkStatus: 7 };

    expect(result).toEqual(expected);
  });
});
