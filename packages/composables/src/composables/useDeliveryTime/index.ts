import { Context } from '@absolute-web/vsf-core';
import { FocusDeliveryTime, FocusDeliveryTimeForAddressInput } from '@absolute-web/magento-api';
import { UseDeliveryTimeFactoryParams, useDeliveryTimeFactory } from '../../factories/useDeliveryTimeFactory';

const factoryParams: UseDeliveryTimeFactoryParams<FocusDeliveryTime, FocusDeliveryTimeForAddressInput> = {
  search: async (context: Context, params): Promise<FocusDeliveryTime[]> => {
    const { data } = await context.$magento.api.focusDeliveryTimeForAddress(params);

    return data.focusDeliveryTimeForAddress;
  },
};

const useDeliveryTime = useDeliveryTimeFactory<FocusDeliveryTime, FocusDeliveryTimeForAddressInput>(factoryParams);

export default useDeliveryTime;
