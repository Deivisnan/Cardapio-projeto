// src/main.js
import { createApp } from 'vue';
import App from './App.vue';


// Importando o Vue Router
import { createRouter, createWebHistory } from 'vue-router';

import 'bootstrap';  // Adiciona o JavaScript necessário para o carrossel e outros componentes interativos

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css'

// Importando os componentes das páginas
import MyPage from './componentes/MyPage.vue';
import AboutPage from './componentes/AboutPage.vue';
import ServicesPage from './componentes/ServicesPage.vue';

// Definindo as rotas
const routes = [
    { path: '/', component: MyPage },
    { path: '/sobre', component: AboutPage },
    { path: '/servicos', component: ServicesPage },
];

// Criando o router
const router = createRouter({
    history: createWebHistory(), // Usando o modo history para URLs limpas
    routes, // As rotas que definimos acima
});

// Criando a aplicação Vue e passando o router
createApp(App)
    .use(router) // Registrando o Vue Router
    .mount('#app'); // Montando a aplicação no elemento #app
