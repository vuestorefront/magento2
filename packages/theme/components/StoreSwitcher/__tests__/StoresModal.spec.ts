import userEvent from '@testing-library/user-event';
import { render } from '~/tests/unit/test-utils';
import StoresModal from '~/components/StoreSwitcher/StoresModal.vue';
import { useStoreMock } from '~/tests/unit/mocks/useStore';
import { useStore } from '~/composables';
import { availableStoresMock } from '~/components/StoreSwitcher/__tests__/availableStores.mock';

jest.mock('~/composables', () => {
  const originalModule = jest.requireActual('~/composables');
  return {
    ...originalModule,
    useStore: jest.fn(),
  };
});

describe('<StoresModal>', () => {
  it('does not render when closed', () => {
    (useStore as jest.Mock).mockReturnValue(useStoreMock);
    const { queryByRole } = render(StoresModal, {
      props: {
        isLangModalOpen: false,
      },
    });

    expect(queryByRole('heading', { name: /change store/i })).toBeNull();
  });

  it('emits "closeModal" event on close', async () => {
    const user = userEvent.setup();

    (useStore as jest.Mock).mockReturnValue(useStoreMock);
    const { getAllByRole, emitted } = render(StoresModal, {
      props: {
        isLangModalOpen: true,
      },
    });

    const closeBtn = getAllByRole('button', { name: /close/i })[0];

    await user.click(closeBtn);

    expect(emitted()).toHaveProperty('closeModal');
  });

  it('renders list of available stores', () => {
    useStoreMock.stores.value = availableStoresMock;

    (useStore as jest.Mock).mockReturnValue(useStoreMock);

    const { getByRole, getByText } = render(StoresModal, {
      props: {
        isLangModalOpen: true,
        storeConfig: { store_code: 'default' },
      },
    });

    getByRole('heading', { name: /change store/i });
    getByText(/default store view/i);
    getByText(/german/i);
  });

  it('on store selection executes method that should redirect to a desired store', async () => {
    const user = userEvent.setup();
    useStoreMock.stores.value = availableStoresMock;

    (useStore as jest.Mock).mockReturnValue(useStoreMock);

    const { getByText } = render(StoresModal, {
      props: {
        isLangModalOpen: true,
        storeConfig: { store_code: 'default' },
      },
    });

    const defaultStoreSwitchBtn = getByText(/default store view/i);

    await user.click(defaultStoreSwitchBtn);

    expect(useStoreMock.change).toBeCalledWith(availableStoresMock[0]);
  });
});
