import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import admin from "./modules/admin";
import ipp from "./modules/ipp";
import referent from "./modules/referent";
import program from "./modules/program";
import organization from "./modules/organization";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    admin,
    ipp,
    organization,
    program,
    referent
  },
  strict: process.env.NODE_ENV !== "production"
});
