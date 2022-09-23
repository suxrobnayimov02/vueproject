import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: () => import("@/layout/main"),
    children: [
      {
        name: "dashboard",
        path: "/",
        component: () => import("@/views/sidebar/dashboard.vue"),
        meta: {
          title: "Bosh sahifa",
        },
      },
      {
        name: "about",
        path: "/about",
        component: () => import("@/views/sidebar/report.vue"),
        meta: {
          title: "Hisobot",
        },
      },
      {
        name: "profile",
        path: "/profile",
        component: () => import("@/views/sidebar/profile.vue"),
      },
      // {
      //   name: "contact",
      //   path: "/contact",
      //   component: () => import("@/views/sidebar/application-leave.vue"),
      //   meta: {
      //     title: "Ariza qoldirish",
      //   },
      // },
      {
        name: "statistic",
        path: "/statistic",
        component: () => import("@/views/sidebar/statistic.vue"),
        meta: "Statistika"
      },
      {
        name: "table",
        path: "/table",
        component: () => import("@/views/sidebar/table.vue"),
        meta: {
          title: "Table"
        }
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
