import { Middleware } from '@nuxt/types';
import { Logger } from '~/helpers/logger';

const middleware : Middleware = () => {
  Logger.error('Please implement vendor-specific checkout.js middleware in the \'middleware\' directory to block access to checkout steps when customer did not yet complete previous steps');
};

export default middleware;
