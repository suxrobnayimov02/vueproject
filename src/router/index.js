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
      {
        name: "comments",
        path: "/comments",
        component: () => import("@/views/comments/comments.vue"),
        meta: "Comments"
      },
      {
        name: "posts-id",
        path: "/comments-id",
        component: () => import("@/views/comments/comments-copy.vue"),
        meta: {
          title: "Posts"
        }
      },
      {
        name: "Posts",
        path: "/posts/list",
        component: () => import("@/views/posts/list.vue"),
        // children: [
        //   {
        //     path: 'list',
        //     component: () => import('@/views/posts/list'),
        //     name: 'ArticleList',
        //     meta: { title: 'Article List', icon: 'list' }
        //   },
        //   {
        //     path: 'create',
        //     component: () => import('@/views/posts/create'),
        //     name: 'CreateArticle',
        //     meta: { title: 'Create Article', icon: 'edit' }
        //   },
        //   {
        //     path: 'edit/:id(\\d+)',
        //     component: () => import('@/views/posts/edit'),
        //     name: 'EditArticle',
        //     meta: {
        //       title: 'Edit Article',
        //       noCache: true,
        //       activeMenu: '/posts/list'
        //     },
        //     hidden: true
        //   }
        // ],
        meta: {
          title: "Posts"
        }
      },
      {
        path: '/posts/create',
        component: () => import('@/views/posts/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      
      {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/posts-new/detail'),
        props: true,
      },
      {
        path: '/posts/index',
        component: () => import('@/views/posts-new/index'),
        name: 'ShowArticle',
        meta: { title: 'Create Article', icon: 'edit' }
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
