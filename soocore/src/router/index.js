import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Main from '@/pages/main'
import Invite from '@/pages/invite'
import Approve from '@/pages/approve'
import Request from '@/pages/request'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/approve',
      name: 'approve',
      component: Approve
    },
    {
      path: '/request',
      name: 'request',
      component: Request
    }
    
  ]
})