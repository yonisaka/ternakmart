import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

import AppHeader from "@/layout/AppHeader";
import AppFooter from "@/layout/AppFooter";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/splash",
      name: "splash",
      component: () => import("@/views/Splash")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register")
    },
    {
      path: '/',
      name: 'home',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/Home"),
        footer: AppFooter
      },
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/detail',
      name: 'detail',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/Detail"),
      }
    },
    {
      path: '/detail/add',
      name: 'detail_add',
      components: {
        default: () => import("@/views/pages/Home/DetailAdd"),
      }
    },
    {
      path: '/detail/payment',
      name: 'detail_payment',
      components: {
        default: () => import("@/views/pages/Home/Payment"),
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Cart/Cart"),
        footer: AppFooter
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({ name: 'splash' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router
