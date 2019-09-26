import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import quanxianguanli from './components/content/quanxianguanli.vue'
import renyuanguanli from './components/content/renyuanguanli.vue'
import chuxing from './components/content/chuxing.vue'
import fangjianguanli from './components/content/fangjianguanli.vue'
import jucan from './components/content/jucan.vue'
import zhiriguanli from './components/content/zhiriguanli.vue'
import wupinguanli from './components/content/wupinguanli.vue'


export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/adimin/power'
    },
    {
      path: '/admin/power',
      component: quanxianguanli
    },
    {
      path: '/admin/user',
      component: renyuanguanli
    },
    {
      path: '/admin/room',
      component: fangjianguanli
    },
    {
      path: '/time/clean',
      component: zhiriguanli
    },
    {
      path: '/time/shop',
      component: wupinguanli
    },
    {
      path: '/meeting/out',
      component: chuxing
    },
    {
      path: '/meeting/eating',
      component: jucan
    },
  ]
})