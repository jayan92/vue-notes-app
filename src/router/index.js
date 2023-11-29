import { createRouter, createWebHashHistory } from "vue-router";

import NotesView from "../views/NotesView.vue";
import StatsView from "../Views/StatsView.vue";
import auth from "../Views/AuthView.vue";

const routes = [
  {
    path: "/",
    component: NotesView,
    name: "notes",
  },
  {
    path: "/stats",
    component: StatsView,
    name: "stats",
  },
  {
    path: "/auth",
    component: auth,
    name: "auth",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
