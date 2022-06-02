import { Ref } from '@nuxtjs/composition-api';

/**
 * Single tab data structure
 */
export interface TabInterface {
  ID: number;
  title: string;
}

/**
 * Tabs configuration data structure
 */
export interface TabsConfigInterface {
  [code: string]: TabInterface;
}

/**
 * Represents the data returned from and functions available in the `useProductTabs()` composable.
 */
export interface UseProductTabsInterface {
  activeTab: Ref<number>;
  setActiveTab(tabId: number): void;
  openNewReviewTab(): void;
}
