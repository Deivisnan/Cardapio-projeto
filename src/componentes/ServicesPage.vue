<template>
  <div>
    <!-- Seção de Lanches -->
    <h1 class="text-cardapio">Lanches</h1>
    <section class="cards">
      <div class="card-container">
        <div class="card" v-for="(service, index) in lanches" :key="index">
          <img :src="service.image" :alt="service.title" class="service-image" />
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <button @click="abrirPopup(service.items)">Saiba mais</button>
        </div>
      </div>
    </section>

    <!-- Seção de Bebidas -->
    <h1 class="text-cardapio">Bebidas</h1>
    <section class="cards">
      <div class="card-container">
        <div class="card" v-for="(service, index) in bebidas" :key="index">
          <img :src="service.image" :alt="service.title" class="service-image" />
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <button @click="abrirPopup(service.items)">Saiba mais</button>
        </div>
      </div>
    </section>

    <!-- Seção de Sorvetes -->
    <h1 class="text-cardapio">Sorvetes</h1>
    <section class="cards">
      <div class="card-container">
        <div class="card" v-for="(service, index) in sorvete" :key="index">
          <img :src="service.image" :alt="service.title" class="service-image" />
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <button @click="abrirPopup(service.items)">Saiba mais</button>
        </div>
      </div>
    </section>

    <!-- Pop-up -->
    <div v-if="popupAberto" class="popup-overlay" @click="fecharPopup"></div>
    <div v-if="popupAberto" class="popup">
      <div class="popup-conteudo">
        <h2>Itens do Cardápio</h2>
        <div class="card-container">
          <div class="card" v-for="(item, index) in itensPopUp" :key="index">
            <h3>{{ item.nome }}</h3>
            <p>Preço: R$ {{ item.preco.toFixed(2) }}</p>
            <!-- Botão de adicionar ao carrinho -->
            <button @click="adicionarAoCarrinho(item)">Adicionar ao Carrinho</button>
          </div>
        </div>
        <button @click="fecharPopup" class="fechar">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ServicesPage',
  data() {
    return {




      // Lanches com itens detalhados
      lanches: [
        {
          title: "Pastel",
          description: "Pastel delicioso.",
          image: require('@/assets/img/pastel.jpeg'),
          items: [
            { nome: "Pastel de Queijo", preco: 10 },
            { nome: "Pastel de Carne", preco: 12 },
          ],
        },
        {
          title: "Batata Frita",
          description: "Batata frita crocante.",
          image: require('@/assets/img/batata.jpeg'),
          items: [
            { nome: "Batata Simples", preco: 8 },
            { nome: "Batata Grande", preco: 14 },
          ],
        },
      ],

      // Bebidas com itens detalhados
      bebidas: [
        {
          title: "Refri",
          description: "Refresco gelado.",
          image: require('@/assets/img/refri.jpeg'),
          items: [
            { nome: "Coca-Cola", preco: 6 },
            { nome: "Guaraná", preco: 5 },
          ],
        },
        {
          title: "Suco",
          description: "Sabor da fruta.",
          image: require('@/assets/img/copo_de_suco.jpeg'),
          items: [
            { nome: "Suco de Laranja", preco: 7 },
            { nome: "Suco de Uva", preco: 7.5 },
          ],
        },
      ],

      // Sorvetes com itens detalhados
      sorvete: [
        {
          title: "Açaí",
          description: "Açaí cremoso.",
          image: require('@/assets/img/acai.jpeg'),
          items: [
            { nome: "Açaí com Granola", preco: 10 },
            { nome: "Açaí com Banana", preco: 12 },
          ],
        },
        {
          title: "Sorvete",
          description: "Saboroso e cremoso.",
          image: require('@/assets/img/sorvete.jpeg'),
          items: [
            { nome: "Sorvete de Chocolate", preco: 8 },
            { nome: "Sorvete de Morango", preco: 7 },
          ],
        },
      ],

      // Controle do pop-up
      popupAberto: false,
      itensPopUp: [],
    };
  },


  methods: {


    ...mapMutations(['adicionarAoCarrinho']), // Usando mutation do Vuex para adicionar ao carrinho
    // Abre o pop-up com os itens fornecidos
    abrirPopup(items) {
      this.itensPopUp = items;
      this.popupAberto = true;
    },
    // Fecha o pop-up e limpa os itens
    fecharPopup() {
      this.popupAberto = false;
      this.itensPopUp = [];
    },




  }
};

</script>


<style scoped>
/* Estilização básica */
.service-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 8px;
}


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 80%;
  max-width: 500px;
}

.popup-conteudo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(50% - 10px); /* Ajusta largura dos cards */
  text-align: center;
}

.fechar {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Smartphones (até 600px) */
@media (max-width: 600px) {
  .card {
    width: 90%; /* Deixa os cards ocuparem quase toda a largura */
    padding: 15px;
  }

  .text-cardapio {
    font-size: 1.2rem; /* Reduz o tamanho do texto */
  }

  .popup {
    width: 95%; /* Pop-up ocupa quase toda a largura */
  }
}

/* Tablets (entre 601px e 1024px) */
@media (min-width: 601px) and (max-width: 1024px) {
  .card {
    width: 45%; /* Duas colunas de cards */
  }

  .text-cardapio {
    font-size: 1.4rem;
  }

  .popup {
    width: 80%; /* Pop-up ocupa 80% da largura */
  }
}

/* Desktops grandes (acima de 1024px) */
@media (min-width: 1025px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 50px;

  }



  .card {
    width: 30%; /* Três colunas de cards */

  }

  .text-cardapio {
    font-size: 2rem; /* Aumenta o texto em telas grandes */
  }
}

</style>
