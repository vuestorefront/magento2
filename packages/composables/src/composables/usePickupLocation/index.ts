import {
  Context,
} from '@absolute-web/vsf-core';
import { PickupLocation, QueryPickupLocationsArgs } from '@absolute-web/magento-api';
import { UsePickupLocationFactory, usePickupLocationFactory } from '../../factories/usePickupLocationFactory';
import { UsePickupLocation } from '../../types/composables';

const factoryParams: UsePickupLocationFactory<PickupLocation, QueryPickupLocationsArgs> = {
  search: async (context: Context, params): Promise<PickupLocation[]> => {
    const { data } = await context.$magento.getApi.pickupLocations(params);

    return data.pickupLocations.items;
  },
};

const usePickupLocation: (cacheId?: string) =>
UsePickupLocation<PickupLocation, QueryPickupLocationsArgs> = usePickupLocationFactory<PickupLocation, QueryPickupLocationsArgs>(factoryParams);

export default usePickupLocation;
