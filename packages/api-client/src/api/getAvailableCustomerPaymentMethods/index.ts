import { ApolloQueryResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import { CustomerAvailablePaymentMethodsQuery } from '@vsf-enterprise/magento-api-types';
import gql from 'graphql-tag';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';
import CustomerAvailablePaymentMethods from './CustomerPaymentMethods';

export default async (
  context: Context,
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>> => {
  try {
    return await context.client.query<CustomerAvailablePaymentMethodsQuery>({
      query: gql`${CustomerAvailablePaymentMethods}`,
      context: {
        headers: getHeaders(context, customHeaders),
      },

    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
