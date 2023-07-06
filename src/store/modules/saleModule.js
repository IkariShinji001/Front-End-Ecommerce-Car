import { reactive } from 'vue';
import {getProfitByMonths, getCarSoldByMonths, getAllCarSoldSortedDate} from "../../services/sale.service"

const state = reactive({
  data: [],
  labels: [],
  error: null,
  carsSold: []
});

const getters = {
  getData: (state) => state.data,
  getLabels: (state) => state.labels,
  getCarsSold: (state) => state.carsSold, 
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
  },
  setCarsSold(state, data){
    state.carsSold = data;
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
  async getAllCarSoldSortedDate({ commit }) {
    try {
      const res = await getAllCarSoldSortedDate();
      commit('setCarsSold', res);
    } catch (error) {
      commit('setCarsSold', null);
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