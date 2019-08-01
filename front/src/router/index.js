import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Main from '@/pages/main'
import Invite from '@/pages/invite'
import Detail from '@/pages/detail'
import Add from '@/pages/add'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      props: (route) => ({ query: route.query.q }),
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
  ]
})
