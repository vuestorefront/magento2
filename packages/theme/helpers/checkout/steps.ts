import { getItem } from '~/helpers/asyncLocalStorage';

export const isPreviousStepValid = async (stepToValidate: string) => {
  const checkout = await getItem('checkout');
  return !(!checkout || !checkout[stepToValidate]);
};
