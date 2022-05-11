import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ScdsView from "@/views/ScdsView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/scds" },
  {
    path: "/scds",
    name: "scds",
    component: ScdsView,
  },
  {
    path: "/scds/:id",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/DetailView.vue"),
  },
  {
    path: "/register/:storageType",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "active",
});

export default router;
