import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  user: {}
};

const mutations = {
  [types.UPDATE_CURRENT_USER](state, user) {
    state.user = user;
  },
  [types.LOGIN_SUCCESS](state, { token, user }) {
    if (token) {
      state.user = user;
      localStorage.setItem("token", token);
    }
  },
  [types.LOGIN_ERROR](state) {
    state.user = {};
    localStorage.removeItem("token");
  },
  [types.LOGOUT_SUCCESS](state) {
    state.user = {};
    localStorage.removeItem("token");
  },
  [types.SET_JURISDICTION](state, data) {
    state.user.jurisdiction = data.jurisdiction;
  }
};

Object.assign(actions, {
  updateCurrentUser({ commit }, data) {
    commit(types.UPDATE_CURRENT_USER, data);
  }
});

export default { state, mutations, getters, actions, namespaced: true };
