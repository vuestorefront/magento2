import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('countries'), () => {
  it('should fetch countries list', async () => {
    const result = await sdk.magento.countries();

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        countries: expect.arrayContaining([
          expect.objectContaining({
            __typename: 'Country',
            id: expect.any(String),
            two_letter_abbreviation: expect.any(String),
            full_name_locale: expect.any(String),
            full_name_english: expect.any(String),
          }),
        ]),
      }),
    });

    expect(result).toEqual(expected);
  });

  it('should fetch countries list using custom queries', async () => {
    const customQuery = {
      countries: 'countries-custom-query',
      metadata: {
        fields: 'full_name_english',
      },
    };

    const result = await sdk.magento.countries({ customQuery });

    expect(result?.data?.countries?.[0]?.full_name_english).toBeDefined();
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.countries?.[0]?.id).toBeUndefined();
  });
});
