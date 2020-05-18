import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Register from '@/pages/register'
import Forbidden from '@/pages/error/403'
import NotFound from '@/pages/error/404'
import Layout from '@/pages/layout'
import Home from '@/pages/home/home'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
      {
          path: '/register',
          name: 'Register',
          component: Register
      }
  ]
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [
    {
        path: '',
        component: Layout,
        name: 'container',
        redirect: 'home',
        meta: {
            requiresAuth: true,
            name: '首页'
        },
        children: [
            {
                path: 'home',
                component: Home,
                name: 'home',
                meta: {
                    name: '首页',
                    slideName:'home',
                    icon: 'icon-home'
                }
            }
        ]
    },
    {
        path: '/403',
        component: Forbidden
    },
    {
        path: '*',
        component: NotFound
    }
]
