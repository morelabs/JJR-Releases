//import Subjects from "@/components/Subject/Subjects";
import Subject from "@/components/Subject/Subject";
//import NewSubject from "@/components/Subject/NewSubject";

const subjects_routes = [
  /*{
    path: "subjects",
    name: "subjects",
    component: Subjects,
    meta: { requireAuth: true, requireAdmin: false }
  },
  */
  {
    path: "subjects/:id",
    name: "subject",
    component: Subject,
    meta: { requireAuth: true, requireAdmin: false }
  }
  /*,
  {
    path: "subjects/nuevo",
    name: "newSubject",
    component: NewSubject,
    meta: { requireAuth: true, requireAdmin: false }
  }*/
];

export default subjects_routes;
