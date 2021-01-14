import VueRouter from 'vue-router';
import Admin from './pages/Admin/Admin.vue';
import Elections from './pages/Elections/Elections.vue';

const routes = [
    {path: '/', component: Admin, name: 'authentication'},
    {path: '/elections', component: Elections, name: 'elections'}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;
