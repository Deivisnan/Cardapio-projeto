// src/store/index.js
import { createStore } from "vuex";

export default createStore({
    state: {
        // Carrega o carrinho do Local Storage ou inicia vazio
        carrinho: JSON.parse(localStorage.getItem("carrinho")) || [],
    },
    mutations: {
        adicionarAoCarrinho(state, item) {
            state.carrinho.push(item);
            // Atualiza o Local Storage
            localStorage.setItem("carrinho", JSON.stringify(state.carrinho));
        },
        removerDoCarrinho(state, index) {
            state.carrinho.splice(index, 1);
            // Atualiza o Local Storage
            localStorage.setItem("carrinho", JSON.stringify(state.carrinho));
        },
    },
    getters: {
        totalCarrinho: (state) => {
            return state.carrinho.reduce((total, item) => total + item.preco, 0);
        },
    },
});
