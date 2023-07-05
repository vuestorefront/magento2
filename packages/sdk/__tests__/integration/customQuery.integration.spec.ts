import { GetProductSearchParams, ProductsListQuery } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { CustomQueryInput, CustomQueryResponse } from '../../src/methods/customQuery';

describe(describeGroup('customQuery'), () => {
  it('sends custom query', async () => {
    const query = `#graphql
      query($search: String!) {
        products(search: $search) {
          items {
            name
          }
        }
      }
    `;

    const queryVariables: GetProductSearchParams = { search: 't-shirt' };

    const result = await sdk.magento.customQuery<
      CustomQueryResponse<ProductsListQuery>,
      CustomQueryInput<GetProductSearchParams>
    >({
      query,
      queryVariables,
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          __typename: 'Products',
          items: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'ConfigurableProduct',
              name: expect.any(String),
            }),
          ]),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });
});
