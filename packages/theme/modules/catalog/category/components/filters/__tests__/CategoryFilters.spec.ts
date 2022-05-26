import userEvent from '@testing-library/user-event';
import { render } from '~/test-utils';
// import { mount } from '@vue/test-utils';
import CategoryFilters from '../CategoryFilters.vue';
import { useUiHelpers } from '~/composables';

jest.mock('~/composables');

jest.mock('~/composables/useApi', () => ({
  useApi: jest.fn().mockReturnValue({
    query: jest.fn(),
  }),
}));

(useUiHelpers as jest.Mock).mockReturnValue({});

describe('CategoryFilters', () => {
  it('CategoryFilters Mobile sidebar should be hidden if isVisible false', () => {
    (useUiHelpers as jest.Mock).mockReturnValue({ getFacetsFromURL: jest.fn(() => ({ filters: {} })) });

    const { container } = render(CategoryFilters, {
      props: {
        catUid: '1',
        isVisible: false,
      },
    });

    const mobileSidebarFilters = container.querySelector('.sidebar-filters.smartphone-only');

    expect(mobileSidebarFilters).toBeNull();
  });

  it('CategoryFilters Mobile sidebar should be visible if isVisible true', () => {
    (useUiHelpers as jest.Mock).mockReturnValue({ getFacetsFromURL: jest.fn(() => ({ filters: {} })) });

    const { container } = render(CategoryFilters, {
      props: {
        catUid: '1',
        isVisible: true,
      },
    });

    const mobileSidebarFilters = container.querySelector('.sidebar-filters.smartphone-only');

    expect(mobileSidebarFilters).not.toBeNull();
  });

  it('Should emit reload product when clicked on "Clear all"', () => {
    const user = userEvent.setup();
    // (useUiHelpers as jest.Mock).mockReturnValue({ getFacetsFromURL: jest.fn(() => ({ filters: {} })) });

    const { emitted, getByText } = render(CategoryFilters, {
      props: {
        catUid: '1',
        isVisible: false,
      },
    });

    const clearAllButton = getByText('Clear All');

    user.click(clearAllButton);

    expect(emitted().reloadProducts).toBeCalled();
    expect(emitted().close).toBeCalled();
  });
});
