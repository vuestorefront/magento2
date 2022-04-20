import { useTraverseCategory } from '~/modules/catalog/category/helpers/useTraverseCategory';
import { useCategoryStore } from '~/stores/category';
import categoryTreeData from '~/test-utils/mocks/categoryTreeDataMock';

const mockUseCategoryStore = { categories: categoryTreeData, load: jest.fn() };

jest.mock('~/stores/category', () => {
  const originalModule = jest.requireActual('~/stores/category');

  return {
    ...originalModule,
    useCategoryStore: jest.fn(() => (mockUseCategoryStore)),
  };
});

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api');

  return {
    ...originalModule,
    useContext: jest.fn(),
    useRoute: jest.fn(),
  };
});

describe('UseTraverseCategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('categoryTree() returns data from the store', () => {
    const { categoryTree } = useTraverseCategory();
    expect(useCategoryStore).toBeCalledTimes(1);
    expect(categoryTree.value).toEqual(categoryTreeData);
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
