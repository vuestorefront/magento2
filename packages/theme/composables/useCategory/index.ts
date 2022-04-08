import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { Category } from '~/composables/types';
import type {
  UseCategoryErrors,
  UseCategoryInterface,
  UseCategoryParamsInput,
} from './useCategory';

/**
 * @public
 *
 * The `useCategory` composable allows searching categories from Magento API. It
 * is commonly used in navigation menus, and provides a search function and the
 * refs for categories, loading and error.
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
 * Search categories on client side using the `onMounted` Composition API hook:
 *
 * ```vue
 * <template>
 *   <div v-if="loading">
 *     Loading categories…
 *   </div>
 *   <div v-else-if="error.search">
 *     Error: {{ error.search.message }}
 *   </div>
 *   <div v-else>
 *     <!-- Display 'categories' -->
 *   </div>
 * </template>
 *
 * <script>
 * import { onMounted } from '@nuxtjs/composition-api';
 * import { useCategory } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { categories, error, loading, search } = useCategory();
 *
 *     onMounted(async () => {
 *       await search({ pageSize: 10 });
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
    search: null,
  });
  const categories: Ref<Array<Category>> = ref(null);

  const search = async (searchParams: UseCategoryParamsInput) => {
    Logger.debug('useCategory/search', searchParams);

    try {
      loading.value = true;
      const { data } = await app.context.$vsf.$magento.api.categoryList(searchParams);
      Logger.debug('[Result]:', { data });
      categories.value = data.categories.items;
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error('useCategory/search', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    loading,
    error,
    categories,
  };
}

export * from './useCategory';

export default useCategory;
