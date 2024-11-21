// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import MyPage from '@/componentes/MyPage.vue';
import AboutPage from '@/componentes/AboutPage.vue';
import ServicesPage from '@/componentes/ServicesPage.vue';

Vue.use(Router);

const routes = [
    { path: '/', component: MyPage },
    { path: '/sobre', component: AboutPage },
    { path: '/servicos', component: ServicesPage },
];

const router = new Router({
    routes,
    mode: 'history' // Para usar URLs sem o hash (#)
});

export default router;
