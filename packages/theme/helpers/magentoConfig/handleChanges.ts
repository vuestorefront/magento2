import { useRoute, useRouter } from '@nuxtjs/composition-api';

export const useHandleChanges = () => {
  const route = useRoute();
  const router = useRouter();

  const {
    path,
    fullPath,
  } = route.value;

  const handleChanges = async ({
    callback,
    redirect = true,
    refresh = false,
    windowRefresh = false,
  }) => {
    if (callback) {
      await callback();
    }

    if (redirect) {
      await router.replace(path);
    }

    if (refresh) {
      // @ts-ignore
      router.go(fullPath);
    }

    if (windowRefresh) {
      window.location.reload();
    }
  };

  return {
    handleChanges,
  };
};
