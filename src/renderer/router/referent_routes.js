import Referents from "@/components/Referent/Referents";
//import Referent from "@/components/Referent/Referent";
//import EditReferent from "@/components/Referent/EditReferent";
//import NewReferent from "@/components/Referent/NewReferent";

const referent_routes = [
  {
    path: "referentes",
    name: "referents",
    component: Referents,
    meta: { requireAuth: true, requireAdmin: false }
  }
];

export default referent_routes;
