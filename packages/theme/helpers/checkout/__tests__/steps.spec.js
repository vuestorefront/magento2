import { isPreviousStepValid } from '~/helpers/checkout/steps';

const CHECKOUT_DATA = {
  'my-account': { a: 'b', c: 'd' },
};

describe('steps :: steps helper for the checkout', () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem('vsf-checkout', JSON.stringify(CHECKOUT_DATA));
  });

  test('user can continue', async () => {
    const isValid = await isPreviousStepValid('my-account');

    expect(isValid).toBeTruthy();
  });

  test('user can\'t continue', async () => {
    const isValid = await isPreviousStepValid('billing');

    expect(isValid).toBeFalsy();
  });
});
