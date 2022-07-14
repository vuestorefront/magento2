import userEvent from '@testing-library/user-event';
import { render } from '~/tests/unit/test-utils';
import CurrenciesModal from '~/components/CurrencySelector/CurrenciesModal.vue';
import { useCurrencyMock } from '~/tests/unit/mocks/useCurrency';
import { useCurrency } from '~/composables';
import { currencyDataMock } from '~/components/CurrencySelector/__tests__/currencyData.mock';

jest.mock('~/composables', () => {
  const originalModule = jest.requireActual('~/composables');
  return {
    ...originalModule,
    useCurrency: jest.fn(),
  };
});

describe('<CurrenciesModal>', () => {
  it('does not render when closed', () => {
    (useCurrency as jest.Mock).mockReturnValue(useCurrencyMock);
    const { queryByRole } = render(CurrenciesModal, {
      props: {
        isModalOpen: false,
      },
    });

    expect(queryByRole('heading', { name: /change store/i })).toBeNull();
  });

  it('emits "closeModal" event on close', async () => {
    const user = userEvent.setup();

    (useCurrency as jest.Mock).mockReturnValue(useCurrencyMock);
    const { getAllByRole, emitted } = render(CurrenciesModal, {
      props: {
        isModalOpen: true,
      },
    });

    const closeBtn = getAllByRole('button', { name: /close/i })[0];

    await user.click(closeBtn);

    expect(emitted()).toHaveProperty('closeModal');
  });

  it('renders list of available stores', () => {
    useCurrencyMock.currency.value = currencyDataMock;

    (useCurrency as jest.Mock).mockReturnValue(useCurrencyMock);

    const { getByRole, getByText } = render(CurrenciesModal, {
      props: {
        isModalOpen: true,
      },
    });

    expect(getByRole('heading', { name: /choose currency/i })).toBeTruthy();
    expect(getByText(/eur/i)).toBeTruthy();
    expect(getByText(/pln/i)).toBeTruthy();
    expect(getByText(/usd/i)).toBeTruthy();
  });

  it('on currency selection executes method that must trigger currency switch', async () => {
    const user = userEvent.setup();
    useCurrencyMock.currency.value = currencyDataMock;

    (useCurrency as jest.Mock).mockReturnValue(useCurrencyMock);

    const { getByText } = render(CurrenciesModal, {
      props: {
        isLangModalOpen: true,
        storeConfig: { store_code: 'default' },
      },
    });

    const eurSwitchBtn = getByText(/eur/i);
    await user.click(eurSwitchBtn);

    expect(useCurrencyMock.change).toBeCalledWith({ id: 'EUR' });
  });
});
