export const useRouteMock = (extend = {}) => ({
  value: {
    path: '/default/gear.html',
    fullPath: '/default/gear.html',
  },
  ...extend,
});

export default useRouteMock;
