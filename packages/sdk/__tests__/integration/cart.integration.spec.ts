import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

const PARAMS = { cartId: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp' };

describe(describeGroup('cart'), () => {
  it('should return cart', async () => {
    const cart = await sdk.magento.cart(PARAMS);

    expect(cart?.data?.cart?.id).toEqual(PARAMS.cartId);
  });

  it('should return customized cart result using custom query', async () => {
    const customQuery = {
      cart: 'cart-custom-query',
      metadata: {
        fields: 'id'
      }
    };

    const result = await sdk.magento.cart(PARAMS, { customQuery });

    expect(result.data.cart!.id).toEqual(PARAMS.cartId);
    // make sure default query is not called by accident
    expect(result.data.cart!.email).toBe(undefined);
  });
});
