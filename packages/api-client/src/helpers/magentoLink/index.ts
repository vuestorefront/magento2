import consola from 'consola';
import { Config } from '../../types/setup';
import { apolloLinkFactory } from './graphQl';
import { linkFactory } from './linkHandlers';

export const createMagentoConnection = (settings: Config) => {
  consola.debug('createMagentoConnection');

  const apolloLink = apolloLinkFactory(settings, {
    apolloLink: linkFactory({ state: settings.state }),
  });

  return {
    apolloLink,
  };
};
