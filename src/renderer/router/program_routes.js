import Programs from "@/components/Program/Programs";
import Program from "@/components/Program/Program";
import EditProgram from "@/components/Program/EditProgram";
import NewProgram from "@/components/Program/NewProgram";

const program_routes = [
  {
    path: "programas",
    name: "programs",
    component: Programs,
    meta: { requireAuth: true, requireAdmin: false }
  },
  {
    path: "programas/nuevo",
    name: "newProgram",
    component: NewProgram,
    meta: { requireAuth: true, requireAdmin: true }
  },
  {
    path: "programas/:id",
    name: "program",
    component: Program,
    meta: { requireAuth: true, requireAdmin: false }
  },
  {
    path: "programas/:id/editar",
    name: "editProgram",
    component: EditProgram,
    meta: { requireAuth: true, requireAdmin: true }
  }
];

export default program_routes;
