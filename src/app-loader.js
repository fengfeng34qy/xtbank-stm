// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './router';
import store from './vuex/store';

import { PageManager } from 'awp-ui-page-manager-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { GlobalTimer } from 'awp-plugin-timing-vue';
import AUISS from 'aui-ss';
import InputErrorTemplate from './components/validation-error-templates/InputErrorTemplate';
import { MyPlugin } from 'my_plugin';

// import myPlug from './components/myPlug';
// import $ from '@/static/lib/jquery';

import '../aui-ss/theme-default/index.css';
import '../src/css/reset.css';
import '../src/css/theme.css';
import '../src/css/theme-aui-ss.css';
require('swiper/dist/css/swiper.css');

Vue.config.productionTip = false;
/* eslint-disable */
import('./pages').then((page) => {
  Vue.use(PageManager, { pages: page.default });
  Vue.use(VueResource);
  Vue.use(VueRouter);
  Vue.use(GlobalTimer);
  Vue.use(AUISS);
  Vue.use(VueAwesomeSwiper);
  Vue.use(MyPlugin);
  // Vue.use(myPlug);

  const router = new VueRouter({
    routes,
    history: false,
    // mode: 'history'
    // mode: 'abstract'
  });
  Vue.component(InputErrorTemplate.name, InputErrorTemplate);

  new Vue({
    el: '#app',
    store,
    router: router,
    // render含义: https://segmentfault.com/q/1010000007130348
    render: h => h(App)
  });
});
