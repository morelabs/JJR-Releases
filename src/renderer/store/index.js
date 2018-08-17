import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import ipp from "./modules/ipp";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    ipp
  },
  strict: process.env.NODE_ENV !== "production"
});
