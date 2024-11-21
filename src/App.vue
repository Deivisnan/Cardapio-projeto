<template>
  <!-- Navegação -->
  <div>
    <header>
      <nav class="navbar navbar-expand-lg bg-primary fixed-top">
        <div class="container-fluid">
          <router-link to="/" class="nav-link">
            <img class="logo me-" :src="require('@/assets/img/LogoLanche.jpg')" alt="logo" height="50">
          </router-link>
          <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="icones navbar-nav top-50">
              <li class="nav-item">
                <a href="https://wa.me/qr/QP5ZQKUWJFJZI1" class="rede-link">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" class="rede-icon" />
                </a>
              </li>
              <li class="nav-item">
                <a href="https://www.instagram.com/pastelaria_flor_da_chapada?igsh=ZXFiMm82OW43dXV4" class="rede-link">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" class="rede-icon" />
                </a>
              </li>
            </ul>

            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/sobre" class="nav-link">Sobre</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/servicos" class="nav-link">Cardápio</router-link>
              </li>
              <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                  Mais
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Contato</a></li>
                  <li><a class="dropdown-item" href="#">Localização</a></li>
                  <li><a class="dropdown-item" href="#">Sobre Nós</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <!-- Ícone do Carrinho -->
          <section>
            <div>
              <div @click="mostrarPopup" class="icone-carrinho">
                <img src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png" alt="Carrinho" class="rede-icon" />
                <span class="contador">{{ carrinho.length }}</span> <!-- Exibe a quantidade de itens -->
                <!-- Notificação -->
                <span class="contador" v-if="carrinho.length > 0">{{ carrinho.length }}</span>
              </div>

              <!-- Pop-up do Carrinho -->
              <div v-if="popupAberto" class="popup">
                <div class="popup-conteudo">
                  <h3>Itens no Carrinho</h3>
                  <ul>
                    <li v-for="(item, index) in carrinho" :key="index">
                      <strong>{{ item.nome }}</strong> - R$ {{ item.preco.toFixed(2) }}
                      <button @click="removerCarrinho(index)">Remover</button>
                    </li>
                  </ul>
                  <p><strong>Total: R$ {{ total }}</strong></p>
                  <button @click="fecharPopup">Fechar</button>

                  <!-- Botão para Enviar Pedido via WhatsApp -->
                  <button @click="irParaWhatsApp" class="btn btn-success mt-3">Enviar Pedido via WhatsApp</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </nav>
    </header>
    <router-view></router-view>

    <!-- Rodapé -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section sobre">
          <h3 class="footer-titulo">Flor da Chapada</h3>
          <p class="footer-descricao">
            Um lugar especial para saborear o melhor da Chapada Diamantina. Lanches frescos, ingredientes locais e um ambiente acolhedor.
          </p>
        </div>
        <div class="footer-section links">
          <h3 class="footer-titulo">Links Úteis</h3>
          <ul class="footer-links">
            <li> <router-link to="/sobre" class="nav-link">Sobre Nós</router-link></li>
            <li><router-link to="/servicos" class="nav-link">Cardápio</router-link></li>
            <li><a href="#opinions">Opiniões</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>
        <div class="footer-section contato">
          <h3 class="footer-titulo">Fale Conosco</h3>
          <p><strong>Email:</strong> contato@flordachapada.com</p>
          <p><strong>Telefone:</strong> (71) 99290-1499</p>
          <div class="footer-redes">
            <a href="#" class="rede-link">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" class="rede-icon" />
            </a>
            <a href="https://www.instagram.com/pastelaria_flor_da_chapada?igsh=ZXFiMm82OW43dXV4" class="rede-link">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" class="rede-icon" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-creditos">
        <p>&copy; 2024 Flor da Chapada. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>
<script>
import MyPage from "@/componentes/MyPage.vue";
import AboutPage from "@/componentes/AboutPage.vue";
import ServicesPage from "@/componentes/ServicesPage.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  componentes: {
    MyPage,
    AboutPage,
    ServicesPage,
  },
  data() {
    return {
      popupAberto: false, // Estado local do popup
    };
  },
  computed: {
    ...mapState(["carrinho"]), // Pega o estado global do carrinho
    total() {
      // Calcula o total diretamente do estado do Vuex
      return this.carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
    },
  },
  methods: {
    ...mapMutations(["removerDoCarrinho"]), // Mapeia a mutation para ser usada no componente

    removerCarrinho(index) {
      this.removerDoCarrinho(index); // Chama a mutation para remover o item
    },
    ...mapMutations(["adicionarAoCarrinho", "removerDoCarrinho"]), // Mapeia mutations do Vuex
    // Controle do popup
    mostrarPopup() {
      this.popupAberto = true;
    },
    fecharPopup() {
      this.popupAberto = false;
    },

    gerarMensagem() {
      let mensagem = "Olá, gostaria de fazer o seguinte pedido:\n";
      this.carrinho.forEach((item, ) => {
        mensagem += ` ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
      });
      mensagem += `\nTotal: R$ ${this.total}`;
      return encodeURIComponent(mensagem); // Codifica a mensagem para uso na URL
    },
    gerarLinkWhatsApp() {
      const numeroWhatsApp = "557192901499"; // Substitua pelo número do WhatsApp
      const mensagem = this.gerarMensagem();
      return `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagem}`;
    },
    irParaWhatsApp() {
      const link = this.gerarLinkWhatsApp();
      window.open(link, "_blank"); // Abre o link em uma nova aba
    },
  },


};
</script>


<style>


.contador {
  position: absolute;
  top: 10px; /* Ajuste a posição */
  right: 10px; /* Ajuste a posição */
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que fica acima de outros elementos */
}


.popup {
  position: absolute; /* ou fixed, dependendo do comportamento desejado */
  top: 50px; /* Ajuste para posicionar abaixo da barra de navegação */
  right: 10px; /* Ajuste para alinhar na lateral */
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  z-index: 1000; /* Garante que ficará acima de outros elementos */
  width: 300px; /* Largura fixa para evitar alterações na interface */
}

/* carrinho de compras */

.icone-carrinho{

  height: 50px;
  width: 50px;
  margin-right:20px ;
  align-items: center;
}



/* Estilo básico para a navegação */
.logo {
  width: 70px;
}


.icones {
  position: absolute; /* Posição absoluta em relação ao corpo da página */
  top: 10px; /* Distância do topo */
  margin-left: 1500px;
  gap: 30px;

}


.rede-link {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.rede-icon {
  width: 100%;
  height: auto;
  filter: invert(100%);
  transition: transform 0.3s ease;
}


nav a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

router-link-active {
  color: #4CAF50;
}


/* Estilo do Footer */
.footer {
  background-color: #321a02;
  color: #fff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
}

.footer-section {
  flex: 1;
  min-width: 250px;
}

.footer-titulo {
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #fff;
  display: inline-block;
}

.footer-descricao {
  font-size: 14px;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #eef6f2;
  text-decoration: none;
  font-size: 14px;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-redes {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.rede-link:hover .rede-icon {
  transform: scale(1.1);
}

.footer-creditos {
  margin-top: 20px;
  font-size: 12px;
  border-top: 1px solid #fff;
  padding-top: 10px;
  width: 100%;
  max-width: 1200px;
  text-align: center;
}


/* Smartphones (até 600px) */
@media (max-width: 600px) {
  .popup {
    width: 90%; /* Pop-up ocupa quase toda a largura */
    right: 5%; /* Centraliza o pop-up em relação à tela */
  }

  .icone-carrinho {
    height: 40px;
    width: 40px;
  }

  .icones {
    top: 5px;
    right: 10px;
    gap: 15px;
  }

  .footer-container {
    gap: 20px; /* Menor espaçamento no rodapé */
  }

  .footer-section {
    min-width: 100%; /* Rodapé ocupa toda a largura */
  }

  .footer-titulo {
    font-size: 18px;
  }

  .footer-descricao {
    font-size: 12px;
  }
}

/* Tablets (601px a 1024px) */
@media (min-width: 601px) and (max-width: 1024px) {
  .popup {
    width: 70%; /* Reduz o tamanho do pop-up */
  }

  .icone-carrinho {
    height: 45px;
    width: 45px;
  }

  .icones {
    top: 10px;
    right: 20px;
    gap: 25px;
  }

  .footer-container {
    gap: 30px;
  }

  .footer-section {
    min-width: 45%; /* Duas colunas no rodapé */
  }

  .footer-titulo {
    font-size: 19px;
  }

  .footer-descricao {
    font-size: 13px;
  }
}

/* Desktops grandes (acima de 1024px) */
@media (min-width: 1025px) {
  .popup {
    width: 300px;
  }

  .footer-container {
    gap: 40px; /* Espaçamento maior entre seções */
  }

  .footer-section {
    min-width: 250px;
  }

  .footer-titulo {
    font-size: 20px;
  }

  .footer-descricao {
    font-size: 14px;
  }
}
</style>
