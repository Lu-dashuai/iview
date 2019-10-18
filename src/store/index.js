import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



const store = new Vuex.Store({
    state:{
        data_url:'',
        // _if = {}
        del_url:''
    }
});



 
export default store;