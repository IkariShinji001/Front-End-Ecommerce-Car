import { reactive } from 'vue';
import {login} from "../../services/auth.service"

const state = reactive({
  token: null,
  username: null,
  error: null,
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
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, username) {
    state.username = username;
  },
  setError(state, error) {
    state.error = error;
  },
  setRole(state, role){
    state.role = role
  },
  setAuthenticated(state, isAuthenticated){
    state.isAuthenticated = isAuthenticated;
  }
};

const actions = {
  async login({ commit }, payload) {
    try {
      const res = await login(payload);
      commit('setToken', res.token);
      commit('setUser', res.decodedToken.username);
      commit('setRole', res.decodedToken.role);
      commit('setAuthenticated', true);
      localStorage.setItem('token', res.token);
    } catch (error) {
      commit('setToken', null);
      commit('setUser', null);
      commit('setAuthenticated', false);
    }
  },
  logout({ commit }) {
    commit('setToken', null);
    commit('setUser', null);
    localStorage.removeItem('token');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};