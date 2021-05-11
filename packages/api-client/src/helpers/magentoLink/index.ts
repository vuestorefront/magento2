import { Logger } from '@vue-storefront/core';
import { Config } from '../../types/setup';
import { apolloLinkFactory } from './graphQl';
import { authLinkFactory } from './linkHandlers';

export const createMagentoConnection = (settings: Config): any => {
  Logger.debug('createMagentoConnection');

  const authLink = authLinkFactory({ state: settings.state });

  const apolloLink = apolloLinkFactory(settings, {
    authLink,
  });

  return {
    apolloLink,
  };
};
