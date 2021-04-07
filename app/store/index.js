import Vue from 'vue';
import Vuex from 'vuex';

import axios from "../assets/js/axios.js";
let http = axios();
Vuex.Store.prototype.$axios = http;

import calc from './calc/index.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    calc: calc,
  },
});

export default store;