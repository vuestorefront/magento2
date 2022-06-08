import { useApi } from '~/composables/useApi';
import getPricesQuery from '~/modules/catalog/pricing/getPricesQuery.gql';
import { PriceRange } from '~/modules/GraphQL/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

export interface PriceItem {
  price_range: PriceRange;
  sku: String;
}

export interface PriceItems {
  items: PriceItem[]
}

export const usePrice = () => {
  const getPrices = async (variables: GetProductSearchParams): Promise<PriceItems> => {
    const { query } = useApi();
    const { data } = await query<{ products: PriceItems }>(getPricesQuery, variables);

    return data?.products ?? { items: [] };
  };

  const getPricesBySku = async (skus: string[], pageSize = 20, currentPage = 1): Promise<PriceItems> => getPrices(
    { filter: { sku: { in: skus } }, pageSize, currentPage },
  );

  return { getPricesBySku, getPrices };
};
