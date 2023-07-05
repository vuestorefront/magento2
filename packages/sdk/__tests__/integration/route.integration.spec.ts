import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('route'), () => {
  it('should resolve route based on the url path', async () => {
    const result = await sdk.magento.route({
      url: 'aether-gym-pant.html',
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        route: expect.objectContaining({
          __typename: expect.any(String),
          sku: expect.any(String),
          type: expect.any(String),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });
});
