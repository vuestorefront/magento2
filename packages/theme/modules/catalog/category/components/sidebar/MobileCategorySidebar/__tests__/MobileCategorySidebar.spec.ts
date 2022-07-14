import userEvent from '@testing-library/user-event';
import { useRoute, useContext, useRouter } from '@nuxtjs/composition-api';
import { render } from '~/tests/unit/test-utils';
import { useUiHelpers, useUiState } from '~/composables';
import { useCategoryStore } from '~/modules/catalog/category/stores/category';
import useUiHelpersMock from '~/tests/unit/mocks/useUiHelpersMock';
import useUiStateMock from '~/tests/unit/mocks/useUiState';
import useRouteMock from '~/tests/unit/mocks/useRoute';
import useRouterMock from '~/tests/unit/mocks/useRouter';
import useContextMock from '~/tests/unit/mocks/useContext';
import { womanCategoryTreeData, defaultCategoryTreeData } from '~/tests/unit/mocks/categoryTreeDataMock';
import useCategoryStoreMock from '~/tests/unit/mocks/useCategoryStore';
import { useMobileCategoryTree } from '../logic';
import MobileCategorySidebar from '../MobileCategorySidebar.vue';

jest.mock('~/composables', () => {
  const composables = jest.requireActual('~/composables');
  return {
    ...composables,
    useUiHelpers: jest.fn(),
    useUiState: jest.fn(),
  };
});

jest.mock('~/modules/catalog/category/stores/category', () => {
  const category = jest.requireActual('~/modules/catalog/category/stores/category');
  return {
    ...category,
    useCategoryStore: jest.fn(),
  };
});

jest.mock('@nuxtjs/composition-api', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...compositionApi,
    useContext: jest.fn(),
    useRoute: jest.fn(),
    useRouter: jest.fn(),
  };
});

jest.mock('../logic', () => {
  const logic = jest.requireActual('../logic');
  return {
    ...logic,
    useMobileCategoryTree: jest.fn(),
  };
});

describe('MobileCategorySidebar.vue', () => {
  beforeEach(() => {
    const uiStateMock = useUiStateMock();
    const UiHelpersMock = useUiHelpersMock();
    const routeMock = useRouteMock();
    const routerMock = useRouterMock();
    const contextMock = useContextMock();
    const categoryStoreMock = useCategoryStoreMock();

    (useUiState as jest.Mock).mockReturnValue(uiStateMock);
    (useUiHelpers as jest.Mock).mockReturnValue(UiHelpersMock);
    (useRoute as jest.Mock).mockReturnValue(routeMock);
    (useRouter as jest.Mock).mockReturnValue(routerMock);
    (useContext as jest.Mock).mockReturnValue(contextMock);
    (useCategoryStore as unknown as jest.Mock).mockReturnValue(categoryStoreMock);
  });

  it('Should render all initial categories', () => {
    (useMobileCategoryTree as jest.Mock).mockReturnValue({
      currentItems: {
        value: defaultCategoryTreeData,
      },
    });

    const { getByText } = render(MobileCategorySidebar);
    const womenCategory = getByText('Women');
    const menCategory = getByText('Men');
    const gearCategory = getByText('Gear');
    const trainingCategory = getByText('Training');

    expect(womenCategory).toBeDefined();
    expect(menCategory).toBeDefined();
    expect(gearCategory).toBeDefined();
    expect(trainingCategory).toBeDefined();
  });

  it('if the user click on a category with children deeper categories will be revealed', async () => {
    const user = userEvent.setup();

    const uiStateMock = useUiStateMock();
    const UiHelpersMock = useUiHelpersMock();
    (useUiHelpers as jest.Mock).mockReturnValue(UiHelpersMock);
    (useUiState as jest.Mock).mockReturnValue(uiStateMock);

    const categoryTreeData = [...defaultCategoryTreeData];
    const onGoCategoryDownMock = jest.fn(() => categoryTreeData.pop());

    (useMobileCategoryTree as jest.Mock).mockReturnValue({
      currentItems: {
        value: defaultCategoryTreeData,
      },
      onGoCategoryDown: onGoCategoryDownMock,
    });

    const { getByText } = render(MobileCategorySidebar);
    const womenCategory = getByText('Women');

    await user.click(womenCategory);
    expect(onGoCategoryDownMock).toHaveBeenCalled();
  });

  it('Should render sub categories when current category is selected and should render "Go back" button.', () => {
    (useMobileCategoryTree as jest.Mock).mockReturnValue(womanCategoryTreeData);

    const { getByText } = render(MobileCategorySidebar);
    const backButton = getByText('Go back');
    const topsButton = getByText('Tops');
    const bottomsButton = getByText('Bottoms');

    expect(backButton).toBeDefined();
    expect(topsButton).toBeDefined();
    expect(bottomsButton).toBeDefined();
  });

  it('Should go back when "Go back" button is clicked', async () => {
    const onGoCategoryUpMock = jest.fn();

    (useMobileCategoryTree as jest.Mock).mockReturnValue({
      ...womanCategoryTreeData,
      onGoCategoryUp: onGoCategoryUpMock,
    });

    const { getByText } = render(MobileCategorySidebar);
    const backButton = getByText('Go back');

    await userEvent.click(backButton);

    expect(onGoCategoryUpMock).toHaveBeenCalledTimes(1);
  });

  it('if the user click on a category without children he will be redirected to that category', async () => {
    const onGoCategoryDownMock = jest.fn((val) => val);
    const UiHelpersMock = useUiHelpersMock();

    (useUiHelpers as jest.Mock).mockReturnValue(UiHelpersMock);

    (useMobileCategoryTree as jest.Mock).mockReturnValue({
      currentItems: {
        value: defaultCategoryTreeData,
      },
      onGoCategoryDown: onGoCategoryDownMock,
    });

    const { getByText } = render(MobileCategorySidebar);

    const trainingButton = getByText('Training');

    await userEvent.click(trainingButton);
    expect(UiHelpersMock.getCatLink).toHaveBeenCalledWith(defaultCategoryTreeData[3]);
  });

  it('if the user click on the back arrow (not the go back button) menu will be hidden', async () => {
    const user = userEvent.setup();

    const uiStateMock = useUiStateMock();
    (useUiState as jest.Mock).mockReturnValue(uiStateMock);
    (useMobileCategoryTree as jest.Mock).mockReturnValue(womanCategoryTreeData);

    const { getByLabelText } = render(MobileCategorySidebar);
    const backbutton = getByLabelText('back');

    await user.click(backbutton);

    expect(uiStateMock.toggleMobileMenu).toHaveBeenCalledTimes(1);
  });
});
