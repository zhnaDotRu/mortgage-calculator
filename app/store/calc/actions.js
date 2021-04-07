import {main} from '../../assets/api/index.js';

export default {
  getCalc({ commit, state }, payload) {
    return this.$axios
      .post(main.getCalc, {})
      .then(res => {
        commit('setData', res.data);
        commit('setStartValue', res.data);
        return res;
      })
      .catch(error => error);
  },

  setCalc({ commit, state }, payload) {
    return this.$axios
      .post(main.setCalc, payload)
      .then(res => {
        console.log(res.data);
        return res;
      })
      .catch(error => error);
  },
}