import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type{ CategoryTree } from '~/modules/GraphQL/types';
import type {
  UseCategoryErrors,
  UseCategoryInterface,
  UseCategoryParamsInput,
} from './useCategory';

/**
 * @public
 *
 * Allows loading categories from Magento API. It
 * is commonly used in navigation menus, and provides the load function and
 * refs for the categories, loading and error.
 *
 * See the {@link UseCategoryInterface} for a list of methods and values available in this composable.
 *
 * @remarks
 *
 * Under the hood, it calls the following Server Middleware API method:
 *
 * - {@link @vue-storefront/magento-api#categoryList} for loading category list;
 *
 * It is currently used in:
 *
 * - `components/AppHeader.vue`
 *
 * - `components/MobileMenuSidebar.vue`
 *
 * @example
 *
 * Load categories on client side using the `onMounted` Composition API hook:
 *
 * ```vue
 * <template>
 *   <div v-if="loading">
 *     Loading categories…
 *   </div>
 *   <div v-else-if="error.load">
 *     Error: {{ error.load.message }}
 *   </div>
 *   <div v-else>
 *     <!-- Display 'categories' -->
 *   </div>
 * </template>
 *
 * <script>
 * import { onMounted } from '@nuxtjs/composition-api';
 * import { useCategory } from '~/modules/catalog/category/composables/useCategory';
 *
 * export default {
 *   setup() {
 *     const { categories, error, load, loading } = useCategory();
 *
 *     onMounted(async () => {
 *       await load({ pageSize: 10 });
 *     });
 *
 *     return {
 *       error,
 *       loading,
 *       categories,
 *     };
 *   },
 * };
 * </script>
 * ```
 */
export function useCategory(): UseCategoryInterface {
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseCategoryErrors> = ref({
    load: null,
  });
  const categories: Ref<Array<CategoryTree>> = ref(null);

  const load = async (params: UseCategoryParamsInput) => {
    Logger.debug('useCategory/load', params);

    try {
      loading.value = true;
      const { data } = await app.context.$vsf.$magento.api.categoryList(params, params?.customQuery ?? null);
      Logger.debug('[Result]:', { data });
      categories.value = data.categories.items;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useCategory/load', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    loading,
    error,
    categories,
  };
}

export * from './useCategory';

export default useCategory;
