import { Logger } from '@vue-storefront/core';
import { Config } from '../../types/setup';
import { apolloLinkFactory } from './graphQl';
import { linkFactory } from './linkHandlers';

export const createMagentoConnection = (settings: Config) => {
  Logger.debug('createMagentoConnection');

  const apolloLink = apolloLinkFactory(settings, {
    apolloLink: linkFactory({ state: settings.state }),
  });

  return {
    apolloLink,
  };
};
