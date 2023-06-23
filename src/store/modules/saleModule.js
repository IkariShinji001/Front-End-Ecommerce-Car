import { reactive } from 'vue';
import {getProfitByMonths} from "../../services/sale.service"
import {getCarSoldByMonths} from "../../services/sale.service"

const state = reactive({
  data: [],
  labels: [],
  error: null
});

const getters = {
  getData: (state) => state.data,
  getLabels: (state) => state.labels,
  getError: (state) => state.error,
};

const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setLabels(state, labels) {
    state.labels = labels;
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async getProfitByMonths({ commit }) {
    try {
      const res = await getProfitByMonths();
      commit('setData', res.data);
      commit('setLabels', res.labels);
      commit('setError', null);
    } catch (error) {
      commit('setData', null);
      commit('setLabels', null);
      commit('setError', error.response.data.error);
    }
  },
  async getCarSoldByMonths({ commit }) {
    try {
      const res = await getCarSoldByMonths();
      commit('setData', res.data);
      commit('setLabels', res.labels);
      commit('setError', null);
    } catch (error) {
      commit('setData', null);
      commit('setLabels', null);
      commit('setError', error.response.data.error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};