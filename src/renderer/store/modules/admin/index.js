import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  users: [],
  config: {}
};

const mutations = {
  [types.LOAD_CONFIG_SUCCESS](state, data) {
    state.config = data.config;
  },
  [types.LOAD_LOV_SUCCESS](state, data) {
    state.listValues = data.listValues;
  },
  [types.LOAD_USERS_SUCCESS](state, data) {
    state.users = data.users;
  },
  [types.LOAD_USERS_ERROR](state) {
    state.users = [];
  },
  [types.ADD_USER_SUCCESS](state, data) {
    state.users.push(data.user);
  },
  [types.UPDATE_USER_SUCCESS](state, data) {
    let current = state.users.find(user => {
      return user.id === data.user.id;
    });
    let currentIndex = state.users.indexOf(current);
    state.users.splice(currentIndex, 1, data.user);
  }
};

export default { state, mutations, getters, actions, namespaced: true };
