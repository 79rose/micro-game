// router/index.ts
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../app.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../pages/index.vue"),
      },
      {
        //匹配string类型的参数
        path: "/games/:id",
        name: "Games",
        component: () => import("../pages/games.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: any) {
  app.use(router);
}
