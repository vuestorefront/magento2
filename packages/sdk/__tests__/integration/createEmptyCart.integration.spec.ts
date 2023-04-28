import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('createEmptyCart'), () => {
  it('should create cart id', async () => {
    const result = await sdk.magento.createEmptyCart();

    const expectedResult = { data: { createEmptyCart: 'lQduCjeeYh86r2yqam7jxqsXhMiAofjA' } };

    expect(result).toEqual(expectedResult);
  });
});
