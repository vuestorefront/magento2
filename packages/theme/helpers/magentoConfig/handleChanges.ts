import { useRoute, useRouter } from '@nuxtjs/composition-api';

export const useHandleChanges = () => {
  const route = useRoute();
  const router = useRouter();

  const {
    path,
    fullPath,
  } = route.value;

  const handleChanges = async (cb, redirect = true, refresh = false) => {
    if (cb) {
      await cb();
    }
    if (redirect) {
      await router.replace(path);
    }

    if (refresh) {
      // @ts-ignore
      router.go(fullPath);
    }
  };

  return {
    handleChanges,
  };
};
