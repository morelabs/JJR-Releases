import actions from "./actions";
import getters from "./getters";
import * as types from "../types";

const initialState = {
  data: {},
  form: {
    base: {},
    victims: [],
    victimizers: [],
    source: {
      observations: [],
      definition: ""
    },
    policeStation: {
      police_station: {},
      crimes: []
    }
  }
};

const mutations = {
  [types.LOAD_IPP_DATA](state, data) {
    state.data = data;
  },
  [types.ADD_PERSON](state, { person, role }) {
    state.form[role].push(person);
  },
  [types.REMOVE_PERSON](state, { personId, role }) {
    let p = state.form[role].find(v => v.id == personId);
    let index = state.form[role].indexOf(p);
    state.form[role].splice(index, 1);
  },
  [types.ADD_CRIME](state, crime) {
    state.form.policeStation.crimes.push(crime);
  },
  [types.REMOVE_CRIME](state, crimeId) {
    let crime = state.form.policeStation.crimes.find(
      v => v.crime.id == crimeId
    );
    let index = state.form.policeStation.crimes.indexOf(crime);
    state.form.policeStation.crimes.splice(index, 1);
  },
  [types.ADD_POLICE_STATION](state, ps) {
    state.form.policeStation.police_station = ps;
  },
  [types.REMOVE_POLICE_STATION](state) {
    state.form.policeStation.police_station = {};
  },
  [types.IPP_SET_BASE](state, data) {
    state.form.base = data;
  },
  [types.REMOVE_OBSERVATION](state, observation) {
    let index = state.form.source.observations.indexOf(observation);
    state.form.source.observations.splice(index, 1);
  },
  [types.ADD_OBSERVATION](state, observation) {
    state.form.source.observations.push(observation);
  },
  [types.ADD_DEFINITION](state, definition) {
    state.form.source.definition = definition;
  },
  [types.REMOVE_DEFINITION](state) {
    state.form.source.definition = "";
  },
  [types.RESET_IPP](state) {
    state.form = {
      base: {},
      victims: [],
      victimizers: [],
      source: {
        observations: []
      },
      policeStation: {
        police_station: {},
        crimes: []
      }
    };
  }
};

// Add non asynchronous actions
Object.assign(actions, {
  async setIppBase({ commit }, data) {
    commit(types.IPP_SET_BASE, data);
    return data;
  },
  async resetIpp({ commit }) {
    commit(types.RESET_IPP);
  }
});

export default {
  state: initialState,
  mutations,
  getters,
  actions,
  namespaced: true
};
