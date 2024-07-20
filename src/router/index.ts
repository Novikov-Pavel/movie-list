import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Movies from "@/views/pages/movies.vue";
import {
  MOVIES,
  MAIN_PAGE,
  MOVIE_ID,
  ROOT_COMPONENT,
  NOT_FOUND,
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
        component: () => import("@/views/components/movie.vue"),
      },
    ],
  },
  // {
  //   path: NOT_FOUND,
  //   name: NOT_FOUND,
  //   component: () => import("@/views/404/NotFound.vue"),
  // },
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: NOT_FOUND,
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
