import { useTraverseCategory } from '~/modules/catalog/category/helpers/useTraverseCategory';
import { useCategoryStore } from '~/modules/catalog/category/stores/category';
import categoryTreeData from '~/tests/unit/mocks/categoryTreeDataMock';

const mockUseCategoryStore = { categories: categoryTreeData[0], load: jest.fn() };

jest.mock('~/modules/catalog/category/stores/category', () => {
  const originalModule = jest.requireActual('~/modules/catalog/category/stores/category');

  return {
    ...originalModule,
    useCategoryStore: jest.fn(() => (mockUseCategoryStore)),
  };
});

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api');

  return {
    ...originalModule,
    useContext: jest.fn(() => ({ app: { localePath: (suffix: unknown) => `/default${suffix}` } })),
    useRoute: jest.fn(() => ({ value: { path: '/default/what-is-new.html' } })),
  };
});

describe('UseTraverseCategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('categoryTree() returns data from the store', () => {
    const { categoryTree } = useTraverseCategory();
    expect(useCategoryStore).toBeCalledTimes(1);
    expect(categoryTree.value).toEqual(categoryTreeData[0]);
  });

  it('activeCategory() returns activeCategory', () => {
    const { activeCategory } = useTraverseCategory();
    expect(useCategoryStore).toBeCalledTimes(1);
    expect(activeCategory.value).toStrictEqual(categoryTreeData[0].children[0]);
  });

  it('isCategoryTreeLoaded() returns true if store has data', () => {
    const { isCategoryTreeLoaded } = useTraverseCategory();
    expect(useCategoryStore).toBeCalledTimes(1);
    expect(isCategoryTreeLoaded.value).toEqual(true);
  });

  it('loadCategoryTree() executes "load" on the store', () => {
    const { loadCategoryTree } = useTraverseCategory();
    loadCategoryTree();
    expect(mockUseCategoryStore.load).toBeCalledTimes(1);
  });

  it('factory returns well defined object', () => {
    const traverseCategory = useTraverseCategory();
    expect(traverseCategory).toHaveProperty('activeCategory');
    expect(traverseCategory).toHaveProperty('categoryAncestors');
    expect(traverseCategory).toHaveProperty('categoryTree');
    expect(traverseCategory).toHaveProperty('loadCategoryTree');
    expect(traverseCategory).toHaveProperty('isCategoryTreeLoaded');
  });
});
