import actions from "./actions";
import getters from "./getters";

const initialState = {
  data: {},
  form: {
    base: {},
    victims: {},
    victimizers: {},
    source: {},
    policeStation: {}
  }
};

const mutations = {
  ["LOAD_IPP_DATA"](state, data) {
    state.ipp.data = data;
  },
  ["IPP_SET_BASE"](state, data) {
    state.form.base = data;
  },
  ["IPP_SET_VICTIMS"](state, data) {
    state.form.victims = data;
  },
  ["IPP_SET_VICTIMIZERS"](state, data) {
    state.form.victimizers = data;
  },
  ["IPP_SET_SOURCE"](state, data) {
    state.form.source = data;
  },
  ["IPP_SET_POLICE"](state, data) {
    state.form.policeStation = data;
  },
  ["IPP_RESET"](state) {
    state.form = {
      base: {},
      victims: {},
      victimizers: {},
      source: {},
      policeStation: {}
    };
  }
};

// Add non asynchronous actions
Object.assign(actions, {
  async setIppBase({ commit }, data) {
    commit("IPP_SET_BASE", data);
    return data;
  },
  async setIppVictims({ commit }, data) {
    commit("IPP_SET_VICTIMS", data);
    return data;
  },
  async setIppVictimizers({ commit }, data) {
    commit("IPP_SET_VICTIMIZERS", data);
    return data;
  },
  async setIppSource({ commit }, data) {
    commit("IPP_SET_SOURCE", data);
    return data;
  },
  async setIppPolice({ commit }, data) {
    commit("IPP_SET_POLICE", data);
    return data;
  },
  async resetIpp({ commit }) {
    commit("IPP_RESET");
  }
});

export default {
  state: initialState,
  mutations,
  getters,
  actions,
  namespaced: true
};
