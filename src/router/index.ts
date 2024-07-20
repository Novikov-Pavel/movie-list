import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Movies from "@/views/pages/Movies.vue";
import {
  MOVIES,
  MAIN_PAGE,
  MOVIE_ID,
  ROOT_COMPONENT,
} from "@/router/routes.json";

const routes: RouteRecordRaw[] = [
  {
    path: MAIN_PAGE,
    redirect: MOVIES,
  },
  {
    path: MOVIES,
    children: [
      {
        path: ROOT_COMPONENT,
        name: MOVIES,
        component: Movies,
      },
      {
        path: MOVIES + "/:" + MOVIE_ID,
        name: MOVIE_ID,
        component: () => import("@/views/pages/MovieInfo.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
