import VueRouter from 'vue-router';
import Authentication from './pages/Authentication/Authentication.vue';
import Elections from './pages/Elections/Elections.vue';

const routes = [
  { path: '/', component: Authentication, name: 'authentication' },
  { path: '/elections', component: Elections, name: 'elections' }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;
