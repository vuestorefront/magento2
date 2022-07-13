import userEvent from '@testing-library/user-event';
import { render } from '~/tests/unit/test-utils';
import CategoryNavbar from '../CategoryNavbar.vue';
import { paginationData, sortByData } from '~/tests/unit/mocks/categoryNavbarMock';
import { useUiHelpers, useUiState } from '~/composables';
import useUiHelpersMock from '~/tests/unit/mocks/useUiHelpersMock';
import useUiStateMock from '~/tests/unit/mocks/useUiState';

jest.mock('~/composables', () => ({
  ...jest.requireActual('~/composables'),
  useUiHelpers: jest.fn(),
  useUiState: jest.fn(),
}));

const categoryNavbarProps = { props: { pagination: paginationData, sortBy: sortByData } };
const loadingCategoryNavbarProps = { props: { pagination: paginationData, sortBy: sortByData, isLoading: true } };

describe('CategoryNavbar.vue', () => {
  it('Should render Skeleton when loading is true', () => {
    const uiStateMock = useUiStateMock();
    useUiState.mockReturnValue(uiStateMock);
    const { getAllByTestId } = render(CategoryNavbar, loadingCategoryNavbarProps);

    const skeletonLoaders = getAllByTestId('skeletonLoader');

    skeletonLoaders.forEach((skeletonLoader) => {
      expect(skeletonLoader).toBeInTheDocument();
    });
  });

  it('Should render "Filters" button and call "toggleFilterSidebar" when clicked', async () => {
    const uiStateMock = useUiStateMock();
    useUiState.mockReturnValue(uiStateMock);
    const { getByText } = render(CategoryNavbar, categoryNavbarProps);
    const button = getByText('Filters');

    await userEvent.click(button);

    expect(uiStateMock.toggleFilterSidebar).toHaveBeenCalledTimes(1);
  });

  it('Should render "sort by" select and change selection and select has all expected options based on its data', async () => {
    const uiHelperMock = useUiHelpersMock();
    useUiHelpers.mockReturnValue(uiHelperMock);

    const {
      getByRole, getByText, getAllByRole, emitted,
    } = render(CategoryNavbar, categoryNavbarProps);
    const sortSelect = getByRole('combobox');
    const options = getAllByRole('option');
    expect(options).toHaveLength(categoryNavbarProps.props.sortBy.options.length);

    await userEvent.selectOptions(sortSelect, ['name_ASC']);
    expect(getByText('Sort: Name A-Z').value).toBe(sortSelect.value);
    expect(emitted().reloadProducts).toHaveProperty('length', 1);
  });

  it('Should render list view icon and change to "List view" when clicked.', async () => {
    const uiStateMock = useUiStateMock();
    useUiState.mockReturnValue(uiStateMock);

    const { getByLabelText } = render(CategoryNavbar, categoryNavbarProps);
    const listViewIcon = getByLabelText(/change to list view/i);

    await userEvent.click(listViewIcon);
    expect(uiStateMock.changeToCategoryListView).toHaveBeenCalledTimes(1);
  });

  it('Should render grid view icon and change to "Grid view" when clicked.', async () => {
    const uiStateMock = useUiStateMock();
    useUiState.mockReturnValue(uiStateMock);

    const { getByLabelText } = render(CategoryNavbar, categoryNavbarProps);
    const gridViewIcon = getByLabelText(/change to grid view/i);

    await userEvent.click(gridViewIcon);

    expect(uiStateMock.changeToCategoryGridView).toHaveBeenCalledTimes(1);
  });
});
