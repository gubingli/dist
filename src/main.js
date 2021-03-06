// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/App'
import router from '@/router'
import store from '@/store/index'
import axios from '@/config/httpConfig'
import '@/assets/styles/index.scss'

// require('./mock.js');

//图片放大
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);

Vue.use(Viewer);
Viewer.setDefaults({
    Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

// 引入 ECharts 主模块
import echarts from "echarts";
Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios

Vue.prototype.$dispatch = function (componentName,eventName) {
    let parent = this.$parent;
    while (parent) {
        let name = parent.$options.name;
        if (name == componentName) {
            break;
        } else {
            parent = parent.$parent;
        }
    }
    if(parent){
        if(eventName){
            return parent.$emit(eventName)
        }
        return parent
    }
}

Vue.config.productionTip = false;
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
        // console.log(store.state.UserToken)
        // console.log(to.matched)
    if (!store.state.UserToken) {//未登录
        console.log(111)
        console.log(to.matched)
        console.log(to.matched.some(record => record.meta.requiresAuth))
        if (
            to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth)
        ) {//有匹配路由且不需要验证
            next()
        } else {
            next({ path: '/login' })
        }

    } else { //已登录
        if (!store.state.permission.permissionList) {//没有 所有路由 则获取 所有路由
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path })
            })
        } else {
            if (to.path !== '/login'||to.path !== '/registor') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})

router.afterEach((to, from, next) => {
    var routerList = to.matched
    store.commit('setCrumbList', routerList);//面包屑
    store.commit('permission/SET_CURRENT_MENU', to.meta.slideName)//current
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
