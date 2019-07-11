import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Main from '@/pages/main'
import Invite from '@/pages/invite'
import Approve from '@/pages/approve'
import Request from '@/pages/request'
import Add from '@/pages/add'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
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
      path: '/approve',
      name: 'approve',
      component: Approve
    },
    {
      path: '/request',
      name: 'request',
      component: Request
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
  ]
})
