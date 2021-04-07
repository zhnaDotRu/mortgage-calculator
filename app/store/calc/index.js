import mutations from './mutations.js';
import state from './state.js';
import actions from './actions.js';
//import getters from './getters.js';

const store = {
  state: state,
  mutations: mutations,
  actions: actions,
  //getters: getters,
  namespaced: true,
}

export default store;