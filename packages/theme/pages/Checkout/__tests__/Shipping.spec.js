/* eslint-disable @typescript-eslint/no-unsafe-argument */
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/vue';
import { useRouter } from '@nuxtjs/composition-api';
import { useBilling, useUserBilling, useShipping, useCountrySearch, useGuestUser, useUser } from '@vue-storefront/magento';
import { render, useBillingMock, useUserBillingMock, useShippingMock, useCountrySearchMock, useUserMock, useGuestUserMock } from '~/test-utils';

import Billing from '../Billing';

jest.mock('@vue-storefront/magento', () => ({
  useBilling: jest.fn(),
  useCountrySearch: jest.fn(),
  useGuestUser: jest.fn(),
  useShipping: jest.fn(),
  useUser: jest.fn(),
  useUserBilling: jest.fn(),
}));

jest.mock('@nuxtjs/composition-api', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@nuxtjs/composition-api');

  return {
    ...originalModule,
    useRouter: jest.fn(),
  };
});

describe('Checkout :: <Billing/>', () => {
  test.todo('Test onMount');
  // it('Form fields are rendered and validated', async () => {
  //
  //   useBilling.mockReturnValue(useBillingMock());
  //   useUserBilling.mockReturnValue(useUserBillingMock());
  //   useShipping.mockReturnValue(useShippingMock());
  //   useCountrySearch.mockReturnValue(useCountrySearchMock());
  //   useUser.mockReturnValue(useUserMock());
  //   useGuestUser.mockReturnValue(useGuestUserMock());
  //
  //   const { getByRole, findAllByText, html } = render(Billing);
  //
  //   console.log(html)
  // });
});
