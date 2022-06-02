import { ref } from '@nuxtjs/composition-api';
import type { TabsConfigInterface } from '~/modules/catalog/product/composables/useProductTabs/useProductTabs';
import type { UseProductTabsInterface } from '~/modules/catalog/product/composables/useProductTabs';

export const TabsConfig: TabsConfigInterface = {
  description: {
    ID: 1,
    title: 'Description',
  },
  reviews: {
    ID: 2,
    title: 'Reviews',
  },
  additional_info: {
    ID: 3,
    title: 'Additional info',
  },
};

/**
 * The `useProductTabs()` composable allows manage product's tabs
 *
 * See the {@link UseProductTabsInterface} page for more information.
 */
export function useProductTabs(): UseProductTabsInterface {
  const activeTab = ref(TabsConfig.description.ID);

  const setActiveTab = (tabId: number) => {
    activeTab.value = tabId;
  };

  const openNewReviewTab = () => {
    if (!process.client) return;

    setActiveTab(TabsConfig.reviews.ID);
    const reviews = document.querySelector('#addReview');
    if (!reviews) return;

    setTimeout(
      () => {
        reviews.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      },
      500,
    );
  };

  return {
    activeTab,
    setActiveTab,
    openNewReviewTab,
  };
}

export default useProductTabs;
export * from './useProductTabs';
