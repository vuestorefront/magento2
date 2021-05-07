export default async ({ app, redirect }) => {
  if (!app.$cookies.get('vsf-customer')) {
    return redirect('/');
  }
};
