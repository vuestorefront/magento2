import { Context } from '@absolute-web/vsf-core';
import { Returns, FocusGuestRmaListInput } from '@absolute-web/magento-api';
import { UseGuestRmaList } from '../../types/composables';
import { UseGuestRmaListFactoryParams, useGuestRmaListFactory } from '../../factories/useGuestRmaListFactory';

const factoryParams: UseGuestRmaListFactoryParams<Returns, FocusGuestRmaListInput> = {
  load: async (context: Context, params: FocusGuestRmaListInput): Promise<Returns> => {
    const { data } = await context.$magento.api.focusGuestRmaList(params);

    return data?.focusGuestRmaList;
  },
};

const useGuestRmaList: (cacheId?: string) => UseGuestRmaList<
Returns,
FocusGuestRmaListInput
> = useGuestRmaListFactory<Returns, FocusGuestRmaListInput>(factoryParams);

export default useGuestRmaList;
