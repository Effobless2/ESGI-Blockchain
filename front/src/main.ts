import {BootstrapVue, BootstrapVueIcons, NavbarPlugin} from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './routes';
import store from './store';
import VueDraggable from 'vue-draggable'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(NavbarPlugin);
Vue.use(BootstrapVue);
Vue.use(VueDraggable);
Vue.use(BootstrapVueIcons);
new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#app');
