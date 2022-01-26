/* eslint @typescript-eslint/no-unsafe-argument: "off" */

import { useRouter } from '@nuxtjs/composition-api';
import userEvent from '@testing-library/user-event';
import {
  useShipping,
  useUserShipping,
  useCountrySearch,
  useUser,
} from '@vue-storefront/magento';
import { waitFor } from '@testing-library/vue';
import { isPreviousStepValid } from '~/helpers/checkout/steps';
import { mergeItem } from '~/helpers/asyncLocalStorage';

import {
  render,
  useCountrySearchMock,
  useShippingMock,
  useUserMock,
  useUserShippingMock,
} from '~/test-utils';
import Shipping from '~/pages/Checkout/Shipping';

jest.mock('~/helpers/asyncLocalStorage', () => {
  const originalModule = jest.requireActual('~/helpers/asyncLocalStorage');

  return {
    ...originalModule,
    mergeItem: jest.fn(),
  };
});

jest.mock('~/components/Checkout/VsfShippingProvider.vue');
jest.mock('@vue-storefront/magento', () => {
  const originalModule = jest.requireActual('@vue-storefront/magento');

  return {
    ...originalModule,
    useUser: jest.fn(),
    useShipping: jest.fn(),
    useUserShipping: jest.fn(),
    useCountrySearch: jest.fn(),
    addressGetter: {
      countriesList: jest.fn(() => [{ id: 'us', abbreviation: 'US', label: 'United States' }]),
      regionList: jest.fn(() => [{ id: 'al', abbreviation: 'AL', label: 'Alabama' }]),
    },
  };
});

jest.mock('~/helpers/checkout/steps');
jest.mock('@nuxtjs/composition-api', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@nuxtjs/composition-api');

  return {
    ...originalModule,
    useRouter: jest.fn(),
  };
});

const values = {
  firstName: 'John',
  lastName: 'Doe',
  streetName: 'Walkinson St.',
  city: 'Gomoria',
  apartment: '1a',
  country: 'US',
  zipCode: '22112',
  phoneNumber: '123321123',
  stateInput: 'AL',
};

useUser.mockReturnValue(useUserMock());
useShipping.mockReturnValue(useShippingMock());
useUserShipping.mockReturnValue(useUserShippingMock());
useCountrySearch.mockReturnValue(useCountrySearchMock());

const formFieldsFactory = (getByRole) => ({
  firstName: getByRole('textbox', { name: /first name/i }),
  lastName: getByRole('textbox', { name: /last name/i }),
  streetName: getByRole('textbox', { name: /street name/i }),
  city: getByRole('textbox', { name: /city/i }),
  apartment: getByRole('textbox', { name: /house\/apartment number/i }),
  country: getByRole('combobox', { name: /country/i }),
  zipCode: getByRole('textbox', { name: /zip-code/i }),
  phoneNumber: getByRole('textbox', { name: /phone number/i }),
  stateInput: getByRole('textbox', { name: /state\/province/i }),
  selectShippingBtn: getByRole('button', { name: /select shipping method/i }),
});

describe('Checkout :: <Shipping/>', () => {
  it('if previous step is not valid go back to an user account step', async () => {
    const routerPushMock = jest.fn();
    useRouter.mockReturnValue({
      push: routerPushMock,
    });
    isPreviousStepValid.mockReturnValue(false);

    render(Shipping);

    await waitFor(() => {
      expect(isPreviousStepValid).toBeCalledTimes(1);
      expect(isPreviousStepValid).toBeCalledWith('user-account');
      expect(routerPushMock).toBeCalledTimes(1);
      expect(routerPushMock).toBeCalledWith('/checkout/user-account');
    });
  });

  it('[GUEST]Shipping form is rendered with all fields', () => {
    const { getByRole } = render(Shipping);
    const {
      firstName,
      lastName,
      streetName,
      city,
      apartment,
      country,
      zipCode,
      phoneNumber,
      stateInput,
    } = formFieldsFactory(getByRole);

    expect(firstName).toBeVisible();
    expect(firstName).toBeRequired();
    expect(lastName).toBeVisible();
    expect(lastName).toBeRequired();
    expect(streetName).toBeVisible();
    expect(streetName).toBeRequired();
    expect(city).toBeVisible();
    expect(city).toBeRequired();
    expect(apartment).toBeVisible();
    expect(apartment).toBeRequired();
    expect(country).toBeVisible();
    // We can't check required param on select because it is not set in the core SfSelect component
    // expect(country).toBeRequired();
    expect(zipCode).toBeVisible();
    expect(zipCode).toBeRequired();
    expect(phoneNumber).toBeVisible();
    expect(phoneNumber).toBeRequired();
    expect(stateInput).toBeVisible();
  });

  it('[GUEST] can save address if all fields have proper data', async () => {
    const saveAddressActionMock = jest.fn();
    useShipping.mockReturnValue(useShippingMock({
      save: saveAddressActionMock,
    }));
    const routerPushMock = jest.fn();
    useRouter.mockReturnValue({
      push: routerPushMock,
    });
    const shippingExpectedSaved = {
      shipping: {
        apartment: '1a', city: 'Gomoria', country_code: 'US', customerAddressId: '', firstname: 'John', lastname: 'Doe', postcode: '22112', street: 'Walkinson St.', telephone: '123321123',
      },
    };
    const { getByRole } = render(Shipping);
    const {
      firstName,
      lastName,
      streetName,
      city,
      apartment,
      country,
      zipCode,
      phoneNumber,
      stateInput,
      selectShippingBtn,
    } = formFieldsFactory(getByRole);

    isPreviousStepValid.mockReturnValue(true);

    userEvent.type(firstName, values.firstName);
    userEvent.type(lastName, values.lastName);
    userEvent.type(streetName, values.streetName);
    userEvent.type(city, values.city);
    userEvent.type(apartment, values.apartment);
    userEvent.selectOptions(country, [values.country]);
    userEvent.type(zipCode, values.zipCode);
    userEvent.type(phoneNumber, values.phoneNumber);
    userEvent.type(stateInput, values.stateInput);

    userEvent.click(selectShippingBtn);

    await waitFor(() => {
      expect(saveAddressActionMock).toBeCalledTimes(1);
      expect(saveAddressActionMock).toBeCalledWith({ shippingDetails: shippingExpectedSaved.shipping });
      expect(mergeItem).toBeCalledTimes(1);
      expect(mergeItem).toBeCalledWith('checkout', shippingExpectedSaved);
    });
  });
});
