import { getGroupedProductPriceCommand } from '~/modules/catalog/pricing/getGroupedProductPriceCommand';
import GroupedProductMock from '~/modules/catalog/pricing/__tests__/mock/GroupedProduct.mock';

describe('getGroupedProductPriceCommand', () => {
  it('Resolve price from the parent if no variant is selected', () => {
    // @ts-expect-error for the simplified mock structure
    expect(getGroupedProductPriceCommand(GroupedProductMock)).toEqual(52);
  });
});
