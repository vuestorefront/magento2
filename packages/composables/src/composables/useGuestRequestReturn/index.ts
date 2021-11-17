import { Context } from '@absolute-web/vsf-core';
import { Return, FocusGuestRequestReturnInput } from '@absolute-web/magento-api';
import { UseGuestRequestReturn } from '../../types/composables';
import { UseGuestRequestReturnFactory, useGuestRequestReturnFactory } from '../../factories/useGuestRequestReturnFactory';
const factoryParams: UseGuestRequestReturnFactory<Return, FocusGuestRequestReturnInput> = {
  requestReturn: async (context: Context, params: FocusGuestRequestReturnInput): Promise<Return> => {
    const { data } = await context.$magento.api.focusGuestRequestReturn(params);

    return data?.focusGuestRequestReturn;
  },
};

const useGuestRequestReturn: (cacheId?: string) => UseGuestRequestReturn<Return, FocusGuestRequestReturnInput> =
  useGuestRequestReturnFactory<Return, FocusGuestRequestReturnInput>(factoryParams);

export default useGuestRequestReturn;
