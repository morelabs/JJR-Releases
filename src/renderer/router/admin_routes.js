import Users from "@/components/Administration/Users";
import Config from "@/components/Administration/Config";

const admin_routes = [
  {
    path: "configuracion",
    name: "adminConfig",
    component: Config,
    meta: { requireAuth: true, requireAdmin: true }
  },
  {
    path: "usuarios",
    name: "adminUsers",
    component: Users,
    meta: { requireAuth: true, requireAdmin: true }
  },
  {
    path: "listaValores",
    name: "listValues",
    component: Config,
    meta: { requireAuth: true, requireAdmin: false }
  }
];

export default admin_routes;
