import { Context } from '@absolute-web/vsf-core';
import {
  Returns, Return, CustomerReturnQueryVariables, CustomerReturnsQueryVariables,
} from '@absolute-web/magento-api';
import { UseCustomerReturns } from '../../types/composables';
import { UseCustomerReturnsFactory, useCustomerReturnsFactory } from '../../factories/useCustomerReturnsFactory';

const factoryParams: UseCustomerReturnsFactory<Returns, Return, CustomerReturnsQueryVariables, CustomerReturnQueryVariables> = {
  loadReturns: async (context: Context, params: CustomerReturnsQueryVariables) => {
    const { data } = await context.$magento.api.customerReturns(params);

    return data?.customer?.returns;
  },

  loadReturn: async (context: Context, params: CustomerReturnQueryVariables) => {
    const { data } = await context.$magento.api.customerReturn(params);

    return data?.customer?.return;
  },
};

const useCustomerReturns: (cacheId?: string) => UseCustomerReturns<Returns, Return, CustomerReturnsQueryVariables, CustomerReturnQueryVariables> =
  useCustomerReturnsFactory<Returns, Return, CustomerReturnsQueryVariables, CustomerReturnQueryVariables>(factoryParams);

export default useCustomerReturns;
