import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('cmsPage'), () => {
  it('should fetch cms page', async () => {
    const result = await sdk.magento.cmsPage({
      identifier: 'home',
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        cmsPage: expect.objectContaining({
          identifier: 'home',
          __typename: 'CmsPage',
        }),
      }),
    });

    expect(result).toEqual(expected);
  });

  it('should fetch cms page using custom query', async () => {
    const customQuery = {
      cmsPage: 'cms-page-custom-query',
      metadata: {
        fields: 'identifier',
      },
    };

    const result = await sdk.magento.cmsPage(
      {
        identifier: 'home',
      },
      { customQuery },
    );

    expect(result?.data?.cmsPage?.identifier).toBeDefined();
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.cmsPage?.title).toBeUndefined();
  });
});
