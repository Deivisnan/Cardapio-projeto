// src/main.js
import { createApp } from 'vue';  // Correção: Usando a API do Vue 3
import App from './App.vue';
import store from './store'; // Importa o Vuex Store

import { createRouter, createWebHistory } from 'vue-router';  // Importando o Vue Router

import 'bootstrap';  // Adiciona o JavaScript necessário para o carrossel e outros componentes interativos
import 'bootstrap/dist/css/bootstrap.min.css';  // Estilos do Bootstrap
import './assets/styles.css';  // Estilos personalizados

// Importando os componentes das páginas
import MyPage from '@/componentes/MyPage.vue';
import AboutPage from '@/componentes/AboutPage.vue';
import ServicesPage from '@/componentes/ServicesPage.vue';

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
    .use(store)  // Usando o Vuex (store)
    .use(router) // Registrando o Vue Router
    .mount('#app'); // Montando a aplicação no elemento #app
