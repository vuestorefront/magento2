export const useRouteMock = (extend = {}) => ({
  value: {
    path: '/default/c/gear.html',
    fullPath: '/default/c/gear.html',
  },
  ...extend,
});

export default useRouteMock;
