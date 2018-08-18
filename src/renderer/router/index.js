import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Ipps from "@/components/Ipp/Ipps";
import NewIpp from "@/components/Ipp/NewIpp";
import Admin from "@/components/Administration/Admin";
import Users from "@/components/Administration/Users";
import Collaborators from "@/components/Administration/Collaborators";
import Institutions from "@/components/Administration/Institutions";
import File from "@/components/Files/File";
import Files from "@/components/Files/Files";

Vue.use(Router);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    component: Layout,
    meta: { requireAuth: true },
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
        meta: { requireAuth: true }
      },
      {
        path: "/ipps/new",
        name: "newIpp",
        component: NewIpp
      },
      {
        path: "/ipps",
        name: "ipps",
        component: Ipps
      },
      {
        path: "/files",
        name: "files",
        component: Files
      },
      {
        path: "/files/:id",
        name: "file",
        component: File
      },
      {
        path: "/admin",
        component: Admin,
        children: [
          {
            path: "",
            name: "adminUsers",
            component: Users
          },
          {
            path: "collaborators",
            name: "adminCollaborators",
            component: Collaborators
          },
          {
            path: "institutions",
            name: "adminInstitutions",
            component: Institutions
          }
        ]
      },
      {
        path: "*",
        component: Dashboard
      }
    ]
  }
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  if (!to.meta.auth) next();
  else {
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
