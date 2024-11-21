// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        carrinho: [],
    },
    mutations: {
        adicionarAoCarrinho(state, item) {
            state.carrinho.push(item);
        },
        removerDoCarrinho(state, index) {
            state.carrinho.splice(index, 1);
        },
    },
    getters: {
        totalCarrinho: (state) => {
            return state.carrinho.reduce((total, item) => total + item.preco, 0);
        },
    },
});
