import { configureContext } from '@vue-storefront/core';
import { useContext } from '@nuxtjs/composition-api';

const setUpBackwardsCompatibilityForSharedRefs = () => {
  const useVSFContext = () => {
    const { $sharedRefsMap } = useContext();
    return { $sharedRefsMap };
  };
  configureContext({ useVSFContext });
};

export default (_ctx, inject) => {
  setUpBackwardsCompatibilityForSharedRefs();
  inject('sharedRefsMap', new Map()); // for sharedRef
};
