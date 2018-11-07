import { concat } from "lodash";

import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import NotFound from "@/components/NotFound";
import Login from "@/components/Login";
import Network from "@/components/Network/Network";
import Admin from "@/components/Administration/Admin";
import VictimizerMap from "@/components/Statistics/VictimizerMap";

import admin_routes from "./admin_routes";
import program_routes from "./program_routes";
import organization_routes from "./organization_routes";
import referents_routes from "./referent_routes";
import ipp_routes from "./ipp_routes";
import subject_routes from "./subject_routes";

Vue.use(Router);

const childrenRoutes = concat(
  [],
  [
    {
      path: "",
      name: "dashboard",
      component: Dashboard,
      meta: { requireAuth: true }
    },
    {
      path: "/map/victimizers",
      name: "victimizerMap",
      component: VictimizerMap
    },
    {
      path: "/admin",
      component: Admin,
      children: admin_routes
    },
    {
      path: "/red",
      component: Network,
      children: concat(program_routes, organization_routes, referents_routes)
    },
    {
      path: "*",
      component: Dashboard
    }
  ],
  ipp_routes,
  subject_routes
);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requireAuth: false, requireAdmin: false }
  },
  {
    path: "/",
    component: Layout,
    children: childrenRoutes,
    meta: { requireAuth: true }
  },
  {
    path: "*/*",
    component: NotFound
  }
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  if (!to.meta.auth) {
    next();
  } else {
    const now = new Date().getTime();
    const token = localStorage.getItem("token") || "";
    try {
      const data = JWTDecode(token);
      if (Number(data.exp) && data.exp > now) {
        next();
      } else {
        next("/login");
      }
    } catch (error) {
      next("/login");
      Vue.$notify.error({
        message: "Error",
        description: "Es necesario estar logueado para acceder",
        duration: 10
      });
    }
  }
});

export default router;
