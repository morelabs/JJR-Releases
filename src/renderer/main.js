import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import VueMoment from "vue-moment";
import moment from "moment";
import VueOffline from "vue-offline";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import InterceptorsSetup from "./api/interceptors";

require("moment/locale/es");
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/icono-arg.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

InterceptorsSetup();

Vue.use(VueMoment, { moment });
Vue.use(ElementUI);
Vue.use(VueOffline);
library.add(faCircle);
Vue.component("fw-icon", FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  template: "<App/>"
});
