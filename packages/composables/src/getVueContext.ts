/* eslint-disable no-param-reassign */
import { EffectScope } from '@vue/composition-api';
import { NuxtAppOptions } from '@nuxt/types/app';
import { getContextProperty } from './helpers/getContextProperty';

export const extendScopeContext = (scope: EffectScope, app: NuxtAppOptions) => {
  // @ts-ignore
  if (scope.vm) {
    // @ts-ignore
    scope.vm.interceptors = getContextProperty(app, 'interceptors');
    // @ts-ignore
    scope.vm.i18n = getContextProperty(app, 'i18n');
    // @ts-ignore
    scope.vm.routing = getContextProperty(app, 'routing');
    // @ts-ignore
    scope.vm.magento = getContextProperty(app, 'magento');
  }
};
