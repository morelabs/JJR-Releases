import Ipps from "@/components/Ipp/Ipps";
import Ipp from "@/components/Ipp/Ipp";
import NewIpp from "@/components/Ipp/NewIpp";

const ipps_routes = [
  {
    path: "ipps",
    name: "ipps",
    component: Ipps,
    meta: { requireAuth: true, requireAdmin: false }
  },
  {
    path: "ipps/:id",
    name: "ipp",
    component: Ipp,
    meta: { requireAuth: true, requireAdmin: false }
  },
  {
    path: "ipps/nuevo",
    name: "newIpp",
    component: NewIpp,
    meta: { requireAuth: true, requireAdmin: false }
  }
];

export default ipps_routes;
