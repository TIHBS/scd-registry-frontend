import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ScdsView from "@/views/ScdsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SettingsView from "@/views/SettingsView.vue";
import PowerGate from "@/views/PowerGate.vue";
import IPFSView from "@/views/IPFSView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/scds" },
  {
    path: "/scds",
    name: "scds",
    component: ScdsView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/power-gate",
    name: "power-gate",
    component: PowerGate,
  },
  {
    path: "/ipfs",
    name: "ipfs",
    component: IPFSView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "active",
});

export default router;
