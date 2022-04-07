import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/analytics',
    component : () => import( '../pages/samplete-table.vue')
  },
  {
    path: '/test',
    component : () => import( '../components/HelloWorld.vue')
  },
  {
    path: '/analytics-form',
    component : () => import( '../pages/analytics-form.vue')
  },
  {
    path: '/live',
    name: 'App',
    component : () => import( '../pages/live.vue')
  },
  {
    path : '',
    redirect : '/analytics'
  },
  {
    path : '*',
    redirect : '/analytics'
  },
]

const router = new VueRouter({
  mode : 'history',
  routes
})


// router.beforeEach((to, _, next) => {
//   const currentUser = {...store.getters['USER/getCurrentUser']};
//   const isAuthenticated = currentUser.userId
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (isAuthenticated) {
//       return next();
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       });
//     }
//   } else {
//     next();
//   }
// })


export default router
