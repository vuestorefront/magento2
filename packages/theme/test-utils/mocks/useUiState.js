export const useUiStateMock = (extend = {}) => ({
  isCartSidebarOpen: false,
  toggleCartSidebar: jest.fn(),
  ...extend,
});

export default useUiStateMock;
