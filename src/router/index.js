import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: () => import("@/layout/main"),
    children: [
      {
        name: "Posts",
        path: "/",
        component: () => import("@/views/posts/index.vue"),
        meta: {
          title: "Bosh sahifa",
        },
      },
      {
        name: "Posts",
        path: "/posts",
        component: () => import("@/views/posts/index.vue"),
        meta: {
          title: "Bosh sahifa",
        },
      },
      {
        name: "Photos",
        path: "/photos",
        component: () => import("@/views/photos/index.vue"),
        meta: {
          title: "Rasmlar",
        },
      },
      {
        name: "Tasks",
        path: "/tasks",
        component: () => import("@/views/tasks/index.vue"),
        meta: {
          title: "Vazifalar",
        },
      },
    ],
  },


  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login.vue"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/403",
    component: () => import("@/views/403"),
    hidden: true,
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  mode: "history",
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes,
});

export default router;
