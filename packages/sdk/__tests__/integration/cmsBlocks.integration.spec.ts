import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('cmsBlocks'), () => {
  const PARAMS = { identifiers: ['1', '2'] };
  it('should fetch cms blocks by identifiers', async () => {
    const result = await sdk.magento.cmsBlocks(PARAMS);

    expect(result?.data?.cmsBlocks?.items?.length).toEqual(2);
  });

  it('should fetch cms blocks with custom query', async () => {
    const customQuery = {
      cmsBlocks: 'cms-blocks-custom-query',
      metadata: {
        fields: 'title',
      },
    };

    const result = await sdk.magento.cmsBlocks(PARAMS, { customQuery });

    expect(result?.data?.cmsBlocks?.items?.[0]?.title).toBeDefined();
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.cmsBlocks?.items?.[0]?.identifier).toBeUndefined();
  });
});
