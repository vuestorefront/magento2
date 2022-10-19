import { defineStore } from 'pinia';

interface PageState {
  routeData: any;
}

export const usePageStore = defineStore('page', {
  state: (): PageState => ({
    routeData: null,
  }),
});
