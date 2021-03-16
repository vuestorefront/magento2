import * as api from './api';
import { apiClientFactory } from '@vue-storefront/core';
export * from './types';
import { onSetup } from './helpers';

const { createApiClient } = apiClientFactory<any, any>({
  tag: 'ma',
  onSetup,
  api: {
    ...api
  }
});

export {
  createApiClient
};
