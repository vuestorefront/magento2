export default function scrollBehavior(_to, _from, savedPosition) {
  return savedPosition || {
    x: 0,
    y: 0,
  };
}
