import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { ProductsListQuery } from '@vsf-enterprise/magento-api-types';
import { ApolloQueryResult } from '@apollo/client';

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

    const queryVariables = { search: 't-shirt' };

    const result = await sdk.magento.customQuery<ApolloQueryResult<ProductsListQuery>>({ query, queryVariables });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          __typename: 'Products',
          items: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'ConfigurableProduct',
              name: expect.any(String)
            })
          ])
        })
      })
    });

    expect(result).toEqual(expected);
  });
});
