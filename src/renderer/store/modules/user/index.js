import getters from "./getters";
import actions from "./actions";
import * as types from "../types";

const state = {
  users: []
};

const mutations = {};

export default { state, mutations, getters, actions, namespaced: true };
