import { mount } from '@vue/test-utils';
import * as composables from '@nuxtjs/composition-api';
import {
  categoryAncestorsFirstLevelMock,
  categoryAncestorsSecondLevelMock,
  categoryAncestorsThirdLevelMock,
  useTraverseCategoryMock,
} from '~/tests/unit/mocks/useTraverseCategoryMock';
import { useUiHelpers } from '~/composables';
import { useTraverseCategory } from '~/modules/catalog/category/helpers/useTraverseCategory';
import CategoryBreadcrumbs from '~/modules/catalog/category/components/breadcrumbs/CategoryBreadcrumbs.vue';
import type { CategoryTree } from '~/modules/GraphQL/types';

jest.mock('@nuxtjs/composition-api', () => {
  const originalComposables = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...originalComposables,
    useContext: jest.fn(),
  };
});
jest.mock('~/composables');
jest.mock('~/modules/catalog/category/helpers/useTraverseCategory');

(composables.useContext as jest.Mock).mockReturnValue({
  localePath: jest.fn((path: string) => path),
});
(useUiHelpers as jest.Mock).mockReturnValue({
  getCatLink: jest.fn(
    (category: CategoryTree): string => `/${category.url_path}${category.url_suffix || ''}`,
  ),
});

describe('CategoryBreadcrumbs.vue', () => {
  it('Breadcrumbs should not render if there is only a first level category', () => {
    (useTraverseCategory as jest.Mock).mockReturnValue(useTraverseCategoryMock(categoryAncestorsFirstLevelMock));
    const wrapper = mount(CategoryBreadcrumbs);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('li').exists()).toBeFalsy();
  });

  it('Breadcrumbs must have one item for the second level category', () => {
    (useTraverseCategory as jest.Mock).mockReturnValue(useTraverseCategoryMock(categoryAncestorsSecondLevelMock));
    const wrapper = mount(CategoryBreadcrumbs);
    expect(wrapper.findAll('li')).toHaveLength(1);
  });

  it('Breadcrumbs must have two item for the third level category', () => {
    (useTraverseCategory as jest.Mock).mockReturnValue(useTraverseCategoryMock(categoryAncestorsThirdLevelMock));
    const wrapper = mount(CategoryBreadcrumbs);
    expect(wrapper.findAll('li')).toHaveLength(2);
  });

  it('Breadcrumb must have link that should have href attribute', () => {
    (useTraverseCategory as jest.Mock).mockReturnValue(useTraverseCategoryMock(categoryAncestorsSecondLevelMock));
    const wrapper = mount(CategoryBreadcrumbs);
    const link = wrapper.find('a');
    expect(link).toBeDefined();
    expect(link.attributes('href')).toBeDefined();
  });

  it('The last breadcrumb must have \'current\' class', () => {
    (useTraverseCategory as jest.Mock).mockReturnValue(useTraverseCategoryMock(categoryAncestorsThirdLevelMock));
    const wrapper = mount(CategoryBreadcrumbs);
    const links = wrapper.findAll('a');
    expect(links.at(-1).classes()).toContain('current');
  });
});
