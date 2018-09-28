import Referents from "@/components/Referent/Referents";
import Referent from "@/components/Referent/Referent";
import EditReferent from "@/components/Referent/EditReferent";
import NewReferent from "@/components/Referent/NewReferent";

const referent_routes = [
  {
    path: "referentes",
    name: "referents",
    component: Referents,
    meta: { requireAuth: true, requireAdmin: false }
  },
  {
    path: "referentes/nuevo",
    name: "newReferent",
    component: NewReferent,
    meta: { requireAuth: true, requireAdmin: true }
  },
  {
    path: "referentes/:id",
    name: "referent",
    component: Referent,
    meta: { requireAuth: true, requireAdmin: false }
  },
  {
    path: "referentes/:id/editar",
    name: "editReferent",
    component: EditReferent,
    meta: { requireAuth: true, requireAdmin: true }
  }
];

export default referent_routes;
