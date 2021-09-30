import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseProductAttribute, UseProductAttributeErrors } from '../types/composables';

export interface UseProductAttributeFactoryParams<
  PRODUCT_ATTRIBUTE,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  load: (context: Context, code: string) => Promise<PRODUCT_ATTRIBUTE>;
}

export function useProductAttributeFactory<PRODUCT_ATTRIBUTE, API extends PlatformApi = any>(
  factoryParams: UseProductAttributeFactoryParams<PRODUCT_ATTRIBUTE, API>,
) {
  return function useProductAttribute(id: string): UseProductAttribute<PRODUCT_ATTRIBUTE> {
    const result: Ref<PRODUCT_ATTRIBUTE> = sharedRef(null, `useProductAttribute-result-${id}`);
    const loading = sharedRef(false, `useProductAttribute-loading-${id}`);
    const error: Ref<UseProductAttributeErrors> = sharedRef({
      load: null,
    }, `useProductAttribute-error-${id}`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(
      factoryParams,
      {
        mainRef: result, loading, error,
      },
    );

    const load = async (code: string) => {
      Logger.debug(`useProductAttribute/${id}/load`, code);

      try {
        loading.value = true;
        result.value = await _factoryParams.load(code);
        error.value.load = null;
      } catch (err) {
        error.value.load = err;
        Logger.error(`useProductAttribute/${id}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      load,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
