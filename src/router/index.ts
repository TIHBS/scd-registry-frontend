import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ScdsView from "@/views/ScdsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SettingsView from "@/views/SettingsView.vue";
import PowerGate from "@/views/PowerGate.vue";
import IPFSView from "@/views/IPFSView.vue";
import DetailView from "@/views/DetailView.vue";

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
    component: DetailView,
  },
  {
    path: "/register/:storageType",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "active",
});

export default router;
