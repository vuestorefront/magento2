import { getConfigurableProductPriceCommand } from '~/modules/catalog/pricing/getConfigurableProductPriceCommand';
import ConfigurableProductWithoutSelectionMock from '~/modules/catalog/pricing/__tests__/mock/ConfigurableProductWithoutSelection.mock';
import ConfigurableProductWithSelectionMock from '~/modules/catalog/pricing/__tests__/mock/ConfigurableProductWithSelection.mock';

describe('getConfigurableProductPriceCommand', () => {
  it('Resolve price from the parent if no variant is selected', () => {
    // @ts-expect-error for the simplified mock structure
    expect(getConfigurableProductPriceCommand(ConfigurableProductWithoutSelectionMock)).toEqual(20);
  });

  it('Resolve price from the variant if variant is selected', () => {
    // @ts-expect-error for the simplified mock structure
    expect(getConfigurableProductPriceCommand(ConfigurableProductWithSelectionMock)).toEqual(45);
  });
});
