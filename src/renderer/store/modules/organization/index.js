import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  organizations: []
};

const mutations = {
  [types.LOAD_ORGANIZATIONS_SUCCESS](state, data) {
    state.organizations = data.organizations;
  },
  [types.LOAD_ORGANIZATIONS_ERROR](state) {
    state.organizations = [];
  },
  [types.ADD_ORGANIZATION_SUCCESS](state, data) {
    state.organizations.push(data.organization);
  },
  [types.UPDATE_ORGANIZATION_SUCCESS](state, data) {
    let current = state.organizations.find(organization => {
      return organization.id === data.organization.id;
    });
    let currentIndex = state.organizations.indexOf(current);
    state.organizations.splice(currentIndex, 1, data.organization);
  }
};

export default { state, mutations, getters, actions, namespaced: true };
