import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import quanxianguanli from './components/content/quanxianguanli.vue'
import renyuanguanli from './components/content/renyuanguanli.vue'
import menuguanli from './components/content/menuguanli.vue'
import wupinguanli from './components/content/wupinguanli.vue'
import login from './components/login/login.vue'


export default new Router({
  routes: [
    {
      path: '/',
      component: login,
      name: 'login'
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
      path: '/admin/menu',
      component: menuguanli
    },
    {
      path: '/time/shop',
      component: wupinguanli
    }
   
    
  ]
})