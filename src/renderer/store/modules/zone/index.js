import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  zones: []
};

const mutations = {
  [types.LOAD_ZONES_SUCCESS](state, data) {
    state.zones = data.zones;
  }
};

export default { state, mutations, getters, actions, namespaced: true };
