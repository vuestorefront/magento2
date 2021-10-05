import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

// eslint-disable-next-line unicorn/prefer-module
require('jsdom-global')();

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(VueCompositionApi);
