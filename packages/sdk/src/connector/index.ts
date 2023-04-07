import * as methods from '../methods';

export const connector = () => {
  const finalMethods: Record<string, any> = methods;

  return finalMethods;
};
