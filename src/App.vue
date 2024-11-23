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
                <a @click.prevent="irParaWhatsApp" class="rede-link">
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
              <div @click="alternarPopup" class="icone-carrinho">
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
                  <button @click="alternarPopup" class="btn btn-secondary">Fechar</button>

                  <!-- Botão para Abrir Prévia do Comprovante -->
                  <button @click="abrirPreviaComprovante"     class="btn btn-primary mt-3">Enviar pedido</button>
                </div>
              </div>

              <!-- Pop-up da Prévia do Comprovante -->
              <!-- Pop-up da Prévia do Comprovante -->
              <div v-if="popupPreviaAberto" class="popup">
                <div class="popup-conteudo">
                  <h3>Prévia do Comprovante</h3>

                  <!-- Mensagem de erro geral -->
                  <p v-if="erroMensagem" class="alert alert-danger">{{ erroMensagem }}</p>

                  <!-- Campo Nome -->
                  <label for="nomeUsuario">Digite seu nome:</label>
                  <input
                      id="nomeUsuario"
                      v-model="nomeUsuario"
                      type="text"
                      class="form-control"
                      placeholder="Seu Nome"
                  />
                  <p v-if="erroNome" class="text-danger">Por favor, preencha seu nome antes de continuar.</p>

                  <!-- Campo Endereço -->
                  <label for="enderecoUsuario">Digite seu endereço:</label>
                  <input
                      id="enderecoUsuario"
                      v-model="enderecoUsuario"
                      type="text"
                      class="form-control"
                      placeholder="Seu Endereço"
                  />
                  <p v-if="erroEndereco" class="text-danger">Por favor, preencha seu endereço antes de continuar.</p>

                  <!-- Exibição do Comprovante -->
                  <div id="comprovante-container" style="padding: 20px; border: 1px solid #ccc; margin-top: 20px;">
                    <h2>Comprovante de Pedido</h2>
                    <p><strong>Nome:</strong> {{ nomeUsuario || "Não informado" }}</p>
                    <p><strong>Endereço:</strong> {{ enderecoUsuario || "Não informado" }}</p>
                    <ul>
                      <li v-for="(item, index) in carrinho" :key="index">
                        {{ item.nome }} - R$ {{ item.preco.toFixed(2) }}
                      </li>
                    </ul>
                    <p><strong>Total:</strong> R$ {{ total }}</p>
                    <p><strong>Data:</strong> {{ new Date().toLocaleString() }}</p>
                  </div>

                  <!-- Botões de ação -->
                  <div class="botoes-acao mt-3">
                    <button @click="gerarComprovantePDF" class="btn btn-primary">Baixar PDF</button>
                    <button @click="gerarComprovanteImagem" class="btn btn-secondary">Baixar Imagem</button>
                  </div>
                  <button @click="fecharPreviaComprovante" class="btn btn-danger mt-3">Desistir do pedido</button>
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",

  data() {
    return {
      popupAberto: false,
      popupPreviaAberto: false,
      nomeUsuario: "", // Nome do usuário
      erroNome: false, // Indica se há um erro no preenchimento do nome
      enderecoUsuario: "", // Endereço do usuário
      erroEndereco: false, // Indica erro no endereço
    };
  },
  computed: {
    ...mapState(["carrinho"]),
    total() {
      return this.carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
    },
  },
  methods: {
      ...mapMutations(["removerDoCarrinho"]), // Mapeia a mutation para ser usada no componente

      removerCarrinho(index) {
        this.removerDoCarrinho(index); // Chama a mutation para remover o item
      },
      ...mapMutations(["adicionarAoCarrinho", ]), // Mapeia mutations do Vuex
      // Controle do popup

    alternarPopup() {
      this.popupAberto = !this.popupAberto;  // Alterna entre verdadeiro e falso
    },
    gerarMensagem() {
      const agora = new Date();
      const hora = agora.getHours();

      // Definir saudação com base no horário
      let saudacao;
      if (hora < 12) {
        saudacao = "Bom dia";
      } else if (hora < 18) {
        saudacao = "Boa tarde";
      } else {
        saudacao = "Boa noite";
      }

      // Criar a mensagem inicial
      const mensagem = `${saudacao}, gostaria de iniciar um pedido.\n`;
      return encodeURIComponent(mensagem); // Codificar para URL
    }
    ,
    gerarLinkWhatsApp() {
      const numeroWhatsApp = "557192901499";
      const mensagem = this.gerarMensagem();
      return `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagem}`;
    },
    irParaWhatsApp() {
      const link = this.gerarLinkWhatsApp();
      window.open(link, "_blank");
    },


    //teste
    gerarLinkWhatsAppComprovante() {
      const numeroWhatsApp = "557192901499"; // Substitua pelo número do WhatsApp
      const mensagem = encodeURIComponent(
          `Olá, segue as informações  do meu pedido:\n\nLink para baixar: ${this.comprovanteURL}`
      );

      return `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagem}`;
    },
    irParaWhatsAppComprovante() {
      const link = this.gerarLinkWhatsAppComprovante();
      window.open(link, "_blank"); // Abre o link em uma nova aba
    },





    // Controle do pop-up da prévia do comprovante
    abrirPreviaComprovante() {
      if (this.carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de visualizar a prévia do comprovante.");
        return; // Impede a execução do código abaixo
      }
      this.popupPreviaAberto = true;
    },
    fecharPreviaComprovante() {
      this.popupPreviaAberto = false;
    },

    // Geração de PDF
    gerarComprovantePDF() {
      // Limpa mensagens de erro anteriores
      this.erroMensagem = "";

      // Valida o campo Nome
      if (!this.nomeUsuario.trim()) {
        this.erroNome = true;
        this.erroMensagem = "Por favor, preencha o nome antes de gerar o PDF.";
        return; // Sai da função se o nome não estiver preenchido
      } else {
        this.erroNome = false;
      }

      // Valida o campo Endereço
      if (!this.enderecoUsuario.trim()) {
        this.erroEndereco = true;
        this.erroMensagem = "Por favor, preencha o endereço antes de gerar o PDF.";
        return; // Sai da função se o endereço não estiver preenchido
      } else {
        this.erroEndereco = false;
      }

      // Gera o PDF se ambos os campos estiverem preenchidos
      this.erroMensagem = ""; // Limpa mensagens de erro para seguir

      const doc = new jsPDF();
      let linhaInicial = 20;

      doc.setFontSize(16);
      doc.text("Comprovante de Pedido", 10, linhaInicial);
      linhaInicial += 10;

      doc.setFontSize(14);
      doc.text(`Nome: ${this.nomeUsuario}`, 10, linhaInicial);
      linhaInicial += 10;
      doc.text(`Endereço: ${this.enderecoUsuario}`, 10, linhaInicial);
      linhaInicial += 10;

      this.carrinho.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}`, 10, linhaInicial);
        linhaInicial += 10;
      });

      linhaInicial += 10;
      doc.setFontSize(14);
      doc.text(`Total: R$ ${this.total}`, 10, linhaInicial);

      linhaInicial += 10;
      doc.setFontSize(10);
      doc.text(`Data: ${new Date().toLocaleString()}`, 10, linhaInicial);

      doc.save("comprovante.pdf");
    }
    ,


    // Geração de Imagem
    gerarComprovanteImagem() {
      // Limpa mensagens de erro anteriores
      this.erroMensagem = "";

      // Valida o campo Nome
      if (!this.nomeUsuario.trim()) {
        this.erroNome = true;
        this.erroMensagem = "Por favor, preencha o nome antes de gerar a imagem.";
        return; // Sai da função se o nome não estiver preenchido
      } else {
        this.erroNome = false;
      }

      // Valida o campo Endereço
      if (!this.enderecoUsuario.trim()) {
        this.erroEndereco = true;
        this.erroMensagem = "Por favor, preencha o endereço antes de gerar a imagem.";
        return; // Sai da função se o endereço não estiver preenchido
      } else {
        this.erroEndereco = false;
      }

      // Gera a imagem se ambos os campos estiverem preenchidos
      this.erroMensagem = ""; // Limpa mensagens de erro para seguir

      const element = document.getElementById("comprovante-container");
      html2canvas(element).then((canvas) => {
        const imageURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageURL;
        link.download = "comprovante.png";
        link.click();
      });
    }
    ,


      // Exemplo de método para enviar o pedido

      enviarPedido() {
        if (this.carrinho.length === 0) {
          alert("Seu carrinho está vazio. Adicione itens para enviar o pedido.");
          return;  // Impede a execução do código abaixo se o carrinho estiver vazio
        }

        // Lógica para enviar o pedido
        console.log("Pedido enviado:", this.carrinho);
        // Aqui você pode adicionar o código de envio, como salvar o pedido, gerar comprovante, etc.
      },


    }


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

  /* Adicionando limites e rolagem */
  max-height: 400px; /* Define uma altura máxima para o popup */
  overflow-y: auto; /* Adiciona rolagem vertical */
  overflow-x: scroll; /* Adiciona rolagem horizontal */
  word-wrap: break-word; /* Evita que palavras muito longas quebrem o layout */
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
