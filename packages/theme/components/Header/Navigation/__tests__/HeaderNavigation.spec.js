import userEvent from '@testing-library/user-event';
import HeaderNavigation from '../HeaderNavigation.vue';
import { render } from '~/test-utils';

import { useUiHelpers } from '~/composables';
import useUiHelpersMock from '~/test-utils/mocks/useUiHelpersMock';
import CategoryTreeDataMock from '~/test-utils/mocks/categoryTreeDataMock';

jest.mock('~/composables');
useUiHelpers.mockReturnValue(useUiHelpersMock());

const sharedOptions = { props: { categoryTree: CategoryTreeDataMock[0].children } };
describe('HeaderNavigation', () => {
  it('displays main categories', () => {
    const { getByRole } = render(HeaderNavigation, sharedOptions);
    getByRole('link', { name: /women/i });
    getByRole('link', { name: /gear/i });
    getByRole('link', { name: /training/i });
  });

  it('subcategories are hidden by default', () => {
    const { queryByTestId } = render(HeaderNavigation, sharedOptions);
    expect(queryByTestId(/navigation-subcategories/i)).toBeNull();
  });

  it('subcategories are displayed on @mouseenter', async () => {
    const user = userEvent.setup();
    const { getByTestId, getByRole } = render(HeaderNavigation, sharedOptions);
    const womenCategory = getByTestId('MjA=');

    await user.hover(womenCategory);
    getByTestId(/navigation-subcategories/i);
    getByRole('link', { name: /tops/i });
    getByRole('link', { name: /jackets/i });
  });

  it('subcategories are displayed on @keyup.tab', async () => {
    const user = userEvent.setup();
    const { getByTestId, getByRole } = render(HeaderNavigation, sharedOptions);
    const womenCategory = getByRole('link', { name: /women/i });

    await user.tab(); // "What's new" no children category
    await user.tab(); // "Women" category with children

    expect(womenCategory).toHaveFocus();
    getByTestId(/navigation-subcategories/i);
    getByRole('link', { name: /tops/i });
    getByRole('link', { name: /jackets/i });
  });
});
