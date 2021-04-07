import './index.html';
import './style.scss';
import './assets/js/polyfill/index.js';

import Vue from 'vue';
import App from './App.vue';
//import router  from './router/index.js';
import store from './store/index.js';

import axios from "./assets/js/axios";

import dynamicImportComponents from './assets/js/dynamicImportComponents.js';
const requireComponent = require.context('./components/UI/', true, /_my-[\w-]+\.vue$/);
dynamicImportComponents(requireComponent, Vue);

let http = axios();
Vue.prototype.$axios = http;

new Vue({
  el: '#app',
  store,
  //router,
  components: {
    app: App
  }
});
