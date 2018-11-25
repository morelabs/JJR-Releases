import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import admin from "./modules/admin";
import ipp from "./modules/ipp";
import subject from "./modules/subject";
import referent from "./modules/referent";
import program from "./modules/program";
import organization from "./modules/organization";
import zone from "./modules/zone";
import person from "./modules/person";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    admin,
    ipp,
    subject,
    organization,
    program,
    referent,
    person,
    zone
  },
  strict: process.env.NODE_ENV !== "production"
});
