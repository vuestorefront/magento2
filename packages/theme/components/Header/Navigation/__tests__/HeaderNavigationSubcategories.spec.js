import userEvent from '@testing-library/user-event';
import { render } from '~/tests/unit/test-utils';
import CategoryTreeDataMock from '~/tests/unit/mocks/categoryTreeDataMock';
import { useUiHelpers } from '~/composables';
import useUiHelpersMock from '~/tests/unit/mocks/useUiHelpersMock';
import HeaderNavigationSubcategories from '../HeaderNavigationSubcategories.vue';

jest.mock('~/composables');
useUiHelpers.mockReturnValue(useUiHelpersMock());

// Women category selection
const childrenProps = { props: { currentCategory: CategoryTreeDataMock[0].children[1] } };
const noChildrenProps = { props: { currentCategory: CategoryTreeDataMock[0].children[0] } };

describe('HeaderNavigationSubcategories', () => {
  it('displays level 1 children category links', () => {
    const { getByRole } = render(HeaderNavigationSubcategories, childrenProps);
    getByRole('link', { name: /tops/i });
    getByRole('link', { name: /bottoms/i });
  });

  it('displays level 2 children category links', () => {
    const { getByRole } = render(HeaderNavigationSubcategories, childrenProps);
    getByRole('link', { name: /jackets/i });
    getByRole('link', { name: /hoodies & sweatshirts/i });
    getByRole('link', { name: /tees/i });
    getByRole('link', { name: /tanks/i });
  });

  it('do not display any links if root category has no children', () => {
    const { queryByTestId } = render(HeaderNavigationSubcategories, noChildrenProps);
    expect(queryByTestId(/navigation-subcategories/i)).toBeNull();
  });

  it('should emit "hideSubcategories" event when linkLv1 is clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render(HeaderNavigationSubcategories, childrenProps);
    const lvl1Link = getByRole('link', { name: /tops/i });

    await user.click(lvl1Link);

    expect(emitted()).toHaveProperty('hideSubcategories');
  });

  it('should emit "hideSubcategories" event when linkLv2 is clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render(HeaderNavigationSubcategories, childrenProps);
    const lvl2Link = getByRole('link', { name: /jackets/i });

    await user.click(lvl2Link);

    expect(emitted()).toHaveProperty('hideSubcategories');
  });
});
