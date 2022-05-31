export const useUiStateMock = (extend = {}) => ({
  isCartSidebarOpen: false,
  changeToCategoryGridView: jest.fn(),
  changeToCategoryListView: jest.fn(),
  toggleCartSidebar: jest.fn(),
  toggleFilterSidebar: jest.fn(),
  toggleMobileMenu: jest.fn(),
  ...extend,
});

export default useUiStateMock;
