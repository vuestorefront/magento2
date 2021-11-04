import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery, Logger } from '@absolute-web/vsf-core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQueryFocus as ProductDetailsQuery,
  ProductDetailsQueryVariables,
  CachedQuery,
  StagingPreviewQueryVariables,
} from '../../types/GraphQL';
import detailQuery from './productDetailsQuery';
import previewDetailQuery from './productDetailsQueryPreview';
import { Context } from '../../types/context';
import { GetProductSearchParams } from '../../types/API';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

export default async (
  context: Context,
  {
    preview,
    ...searchParams
  }: StagingPreviewQueryVariables<GetProductSearchParams>,
  customQuery: CustomQuery = { productDetail: 'productDetail' },
): Promise<ApolloQueryResult<CachedQuery<ProductDetailsQuery>>> => {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    ...defaultParams,
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { productDetail } = context.extendQuery(customQuery, {
    productDetail: {
      query: preview ? previewDetailQuery : detailQuery,
      variables,
    },
  });

  return context.client.query<CachedQuery<ProductDetailsQuery>, ProductDetailsQueryVariables>({
    query: productDetail.query,
    variables: productDetail.variables,
    ...(preview ? {
      context: {
        headers: {
          Authorization: `Bearer ${preview.accessToken}`,
          'Preview-Version': preview.version,
        },
      },
    } : {}),
  });
};
