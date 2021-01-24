import VueRouter from 'vue-router';
import Admin from './pages/Admin/Admin.vue';
import ElectionDashboard from './pages/ElectionDashboard';
import Elections from './pages/Elections/Elections.vue';

const routes = [
    {path: '/', component: Admin, name: 'authentication'},
    {path: '/elections', component: Elections, name: 'elections'},
    {path: '/dashboard', component: ElectionDashboard, name: 'dashboard'}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;
