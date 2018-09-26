import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  referents: []
};

const mutations = {
  [types.LOAD_REFERENTS_SUCCESS](state, data) {
    state.referents = data.referents;
  },
  [types.LOAD_REFERENTS_ERROR](state) {
    state.referents = [];
  },
  [types.ADD_REFERENT_SUCCESS](state, data) {
    state.referents.push(data.referent);
  },
  [types.UPDATE_REFERENT_SUCCESS](state, data) {
    let current = state.referents.find(referent => {
      return referent.id === data.referent.id;
    });
    let currentIndex = state.referents.indexOf(current);
    state.referents.splice(currentIndex, 1, data.referent);
  }
};

export default { state, mutations, getters, actions, namespaced: true };
