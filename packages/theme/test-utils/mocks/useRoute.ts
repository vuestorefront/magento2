export const useRouteMock = (extend = {}) => ({
  value: {
    fullPath: '/default/c/gear.html',
  },
  ...extend,
});

export default useRouteMock;
