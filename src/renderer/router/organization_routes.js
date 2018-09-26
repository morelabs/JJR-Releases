import Organizations from "@/components/Organization/Organizations";
//import Organization from "@/components/Organization/Organization";
//import EditOrganization from "@/components/Organization/EditOrganization";
//import NewOrganization from "@/components/Organization/NewOrganization";

const organization_routes = [
  {
    path: "organizaciones",
    name: "organizations",
    component: Organizations,
    meta: { requireAuth: true, requireAdmin: false }
  }
];

export default organization_routes;
