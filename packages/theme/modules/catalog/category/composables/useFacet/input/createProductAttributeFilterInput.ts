import { ProductAttributeFilterInput } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables';
import type { FacetSearchParams } from '../useFacet';

export const rangeFilters = ['price'];

export function createProductAttributeFilterInput(params: ComposableFunctionArgs<FacetSearchParams>): ProductAttributeFilterInput {
  const attributeFilter = {};
  const inputFilters = params?.filters ?? {};

  const categoryFilter = params.categoryId && !inputFilters.category_id
    ? {
      category_uid: {
        ...(Array.isArray(params.categoryId)
          ? { in: params.categoryId }
          : { eq: params.categoryId }),
      },
    }
    : {};

  Object.keys(inputFilters).forEach((key: string) => {
    if (rangeFilters.includes(key)) {
      const range = { from: 0, to: 0 };
      const flatValue = inputFilters[key]
        .flatMap((inputFilter) => inputFilter.split('_'))
        .map((str: string) => Number.parseFloat(str))
        .sort((a, b) => a - b);

      [range.from] = flatValue;
      range.to = flatValue[flatValue.length - 1];

      attributeFilter[key] = range;
    } else if (typeof inputFilters[key] === 'string') {
      attributeFilter[key] = { eq: inputFilters[key] };
    } else if (inputFilters[key].length === 1) {
      attributeFilter[key] = { eq: inputFilters[key][0] };
    } else {
      attributeFilter[key] = { in: inputFilters[key] };
    }
  });

  return { ...attributeFilter, ...categoryFilter };
}
