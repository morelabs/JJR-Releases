import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import VueMoment from "vue-moment";
import moment from "moment";
import VueOffline from "vue-offline";
import VueSimpleSuggest from "vue-simple-suggest";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faChevronRight,
  faChevronLeft,
  faLock,
  faSignOutAlt,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import locale from "element-ui/lib/locale/lang/es";
import InterceptorsSetup from "./api/interceptors";

require("moment/locale/es");
moment.locale("es");
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/icono-arg.css";
import "vue-simple-suggest/dist/styles.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

InterceptorsSetup();

Vue.use(VueMoment, { moment });
Vue.use(ElementUI, { locale });
Vue.use(VueOffline);

library.add(
  faCircle,
  faChevronLeft,
  faChevronRight,
  faLock,
  faSignOutAlt,
  faChartBar
);
Vue.component("fw-icon", FontAwesomeIcon);
Vue.component("vue-simple-suggest", VueSimpleSuggest);
Vue.filter("capitalize", function(name) {
  if (!name) return "";
  let values = name
    .toString()
    .replace(/_/g, " ")
    .split(" ");
  return values.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  template: "<App/>"
});
