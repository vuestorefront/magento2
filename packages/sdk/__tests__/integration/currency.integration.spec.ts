import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('currency'), () => {
  it('should fetch currencies', async () => {
    const result = await sdk.magento.currency();

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        currency: expect.objectContaining({
          base_currency_code: expect.any(String),
          base_currency_symbol: expect.any(String),
          default_display_currency_code: expect.any(String),
          default_display_currency_symbol: expect.any(String),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });

  it('should fetch currencies using custom queries', async () => {
    const customQuery = {
      currency: 'currency-custom-query',
      metadata: {
        fields: 'base_currency_code',
      },
    };

    const result = await sdk.magento.currency({ customQuery });

    expect(result?.data?.currency?.base_currency_code).toBeDefined();
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.currency?.base_currency_symbol).toBeUndefined();
  });
});
