import { NavbarPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './routes';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(NavbarPlugin);

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
