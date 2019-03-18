import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import AddTimes from '@/components/AddTimes'
import Overview from '@/components/Overview'
import Statistics from '@/components/Statistics'
import Export from '@/components/Export'
import Logout from '@/components/Logout'
import store from '@/store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/home')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/home',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/add',
      name: 'AddTimes',
      component: AddTimes,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/export',
      name: 'Export',
      component: Export,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      beforeEnter: ifAuthenticated
    }
  ]
})
