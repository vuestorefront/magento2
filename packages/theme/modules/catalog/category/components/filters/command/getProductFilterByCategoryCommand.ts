import { useApi } from '~/composables/useApi';
import { Aggregation, FilterEqualTypeInput, Products } from '~/modules/GraphQL/types';
import GetProductFilterByCategoryQuery from '~/modules/catalog/category/components/filters/command/getProductFilterByCategory.gql';

export const getProductFilterByCategoryCommand = {
  execute: async (categoryIdFilter: FilterEqualTypeInput): Promise<Aggregation[]> => {
    const { query } = useApi();
    const { data } = await query<{ products: Products }>(GetProductFilterByCategoryQuery, { categoryIdFilter });

    return data?.products?.aggregations ?? [];
  },
};

export default getProductFilterByCategoryCommand;
