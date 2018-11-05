import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  subjects: []
};

const mutations = {
  [types.LOAD_SUBJECTS_SUCCESS](state, data) {
    state.subjects = data.subjects;
  },
  [types.LOAD_SUBJECTS_ERROR](state) {
    state.subjects = [];
  },
  [types.ADD_SUBJECT_SUCCESS](state, data) {
    state.subjects.push(data.subject);
  },
  [types.UPDATE_SUBJECT_SUCCESS](state, data) {
    let current = state.subjects.find(subject => {
      return subject.id === data.subject.id;
    });
    let currentIndex = state.subjects.indexOf(current);
    state.subjects.splice(currentIndex, 1, data.subject);
  }
};

export default { state, mutations, getters, actions, namespaced: true };
