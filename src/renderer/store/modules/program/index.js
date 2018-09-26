import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  programs: []
};

const mutations = {
  [types.LOAD_PROGRAMS_SUCCESS](state, data) {
    state.programs = data.programs;
  },
  [types.LOAD_PROGRAMS_ERROR](state) {
    state.programs = [];
  },
  [types.ADD_PROGRAM_SUCCESS](state, data) {
    state.programs.push(data.program);
  },
  [types.UPDATE_PROGRAM_SUCCESS](state, data) {
    let current = state.programs.find(program => {
      return program.id === data.program.id;
    });
    let currentIndex = state.programs.indexOf(current);
    state.programs.splice(currentIndex, 1, data.program);
  }
};

export default { state, mutations, getters, actions, namespaced: true };
