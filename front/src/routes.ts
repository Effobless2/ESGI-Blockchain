import Vue from 'vue';
import VueRouter from 'vue-router';
import Authentication from './pages/Authentication/Authentication.vue';
import Elections from './pages/Elections/Elections.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/authentication', component: Authentication, name: 'authentication' },
  { path: '/elections', component: Elections, name: 'elections' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;
