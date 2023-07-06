import { reactive } from 'vue';
import {login, logout} from "../../services/auth.service"

const state = reactive({
  token: null,
  username: null,
  role: null,
  isAuthenticated: false
});

const getters = {
  getToken: (state) => state.token,
  getUser: (state) => state.username,
  getError: (state) => state.error,
  getRole: (state) => state.role,
  isAuthenticated: state => state.isAuthenticated
};

const mutations = {
  setAuthenticated(state, isAuthenticated){
    state.isAuthenticated = isAuthenticated;
  },
  setUsername(state, username){
    state.username = username;
  },
  setRole(state, role){
    state.role = role;
  }
};

const actions = {
  async login({ commit }, payload) {
    try {
      const res = await login(payload);
      commit('setUsername', res.username);
      commit('setRole', res.role);
      commit('setAuthenticated', true);
    } catch (error) {
      commit('setAuthenticated', false);
    }
  },
  async logout({ commit }) {
    try {
      await logout();
      commit('setUsername', null);
      commit('setRole', null);
      commit('setAuthenticated', false);
    } catch (error) {
      commit('setAuthenticated', false);
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