import { Context } from '@absolute-web/vsf-core';
import { Return, FocusGuestRmaInput } from '@absolute-web/magento-api';
import { UseGuestRma } from '../../types/composables';
import { UseGuestRmaFactoryParams, useGuestRmaFactory } from '../../factories/useGuestRmaFactory';

const factoryParams: UseGuestRmaFactoryParams<Return, FocusGuestRmaInput> = {
  load: async (context: Context, params: FocusGuestRmaInput): Promise<Return> => {
    const { data } = await context.$magento.api.focusGuestRma(params);

    return data?.focusGuestRma?.return;
  },
};

const useGuestRma: (cacheId?: string) => UseGuestRma<
Return,
FocusGuestRmaInput
> = useGuestRmaFactory<Return, FocusGuestRmaInput>(factoryParams);

export default useGuestRma;
