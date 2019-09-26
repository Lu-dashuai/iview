import Vue from 'vue';
import Router from 'vue-router';
import App from './main.vue';
import router from './router.js';
import iView from 'iview';
import store from './store/index.js'
// 导入vue-resource
import VueResource from 'vue-resource'
// 注册resource
Vue.use(VueResource)
import 'iview/dist/styles/iview.css';


Vue.http.options.root = 'http://192.168.1.61:8090';

Vue.use(Router);
Vue.use(iView);



new Vue({
    el: '#app',
    data:{
        
    },
    methods:{
        
    },
    created:function(){
        
    },
    render: h => h(App),
    router,
    store
});