import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";

export const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: "/scube",
    name: "scube",
    component: () => import("@/views/train.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
});

export default router;