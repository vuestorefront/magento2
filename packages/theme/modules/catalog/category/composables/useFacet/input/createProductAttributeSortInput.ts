import { ProductAttributeSortInput } from '~/modules/GraphQL/types';

export function createProductAttributeSortInput(sortData: string): ProductAttributeSortInput {
  const baseData = sortData.split(/_/gi);

  return baseData.length > 0 ? Object.fromEntries([baseData]) : {};
}
