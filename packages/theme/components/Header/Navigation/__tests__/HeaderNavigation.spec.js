import userEvent from '@testing-library/user-event';
import { render } from '~/tests/unit/test-utils';

import { useUiHelpers } from '~/composables';
import useUiHelpersMock from '~/tests/unit/mocks/useUiHelpersMock';
import CategoryTreeDataMock from '~/tests/unit/mocks/categoryTreeDataMock';
import HeaderNavigation from '../HeaderNavigation.vue';

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

  it('main link is focused on @keyup.tab', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(HeaderNavigation, sharedOptions);
    const womenCategory = getByTestId('MjA=');

    await user.tab(); // "What's new" no children category
    await user.tab(); // "Women" category with children

    expect(womenCategory).toHaveFocus();
  });

  it('user can traverse cat links with arrow keys', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(HeaderNavigation, sharedOptions);
    const whatsNewCategory = getByTestId('Mzg=');
    const womenCategory = getByTestId('MjA=');
    const menCategory = getByTestId('MTE=');
    const gearCategory = getByTestId('Mw==');

    // Moving right
    await user.tab(); // "What's new" no children category
    expect(whatsNewCategory).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(womenCategory).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(menCategory).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(gearCategory).toHaveFocus();

    // Moving left
    await user.keyboard('{ArrowLeft}');
    expect(menCategory).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(womenCategory).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(whatsNewCategory).toHaveFocus();
  });

  it('user can open submenu with @keydown.down and close it with @keydown.up', async () => {
    const user = userEvent.setup();
    const { getByTestId, getByRole, queryByTestId } = render(HeaderNavigation, sharedOptions);
    const womenCategory = getByTestId('MjA=');

    await user.tab(); // "What's new" no children category
    await user.keyboard('{ArrowRight}');
    expect(womenCategory).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    getByTestId(/navigation-subcategories/i);
    getByRole('link', { name: /tops/i });
    getByRole('link', { name: /jackets/i });

    await user.keyboard('{ArrowUp}');
    expect(queryByTestId('navigation-subcategories')).toBeFalsy();
  });
});
