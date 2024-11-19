<template>
  <main>
    <section class="sobre-secao">
      <h2 class="titulo-sobre">Nossa História</h2>
      <p class="descricao-sobre">
        A <strong>Flor da Chapada</strong> nasceu do desejo de criar um espaço acolhedor
        e saboroso, inspirado na beleza e riqueza da Chapada Diamantina.
        Fundada em 2015, somos apaixonados por oferecer lanches frescos,
        ingredientes locais e experiências inesquecíveis a cada cliente.
      </p>
    </section>

    <section class="opinioes-secao">
      <h2 class="titulo-opinioes">Compartilhe Sua Opinião</h2>
      <div class="formulario-opiniao">
        <label for="nome" class="rotulo">Seu Nome:</label>
        <input
            type="text"
            id="nome"
            class="entrada"
            placeholder="Digite seu nome"
            v-model="nome"
        />

        <label for="opiniao" class="rotulo">Sua Opinião:</label>
        <textarea
            id="opiniao"
            class="entrada-texto"
            placeholder="Deixe sua opinião aqui"
            v-model="opiniao"
        ></textarea>

        <button
            id="enviar-opiniao"
            class="botao-enviar"
            @click="adicionarOpiniao"
        >
          Enviar
        </button>
      </div>

      <div class="lista-opinioes">
        <h3 class="titulo-comentarios">Comentários Recentes:</h3>
        <ul class="lista-container">
          <li
              v-for="(comentario, index) in comentarios"
              :key="index"
              class="comentario"
          >
            <strong>{{ comentario.nome }}:</strong> {{ comentario.opiniao }}
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      nome: "",
      opiniao: "",
      comentarios: [], // Lista de comentários
    };
  },
  methods: {
    adicionarOpiniao() {
      if (this.nome && this.opiniao) {
        // Adiciona a nova opinião na lista
        this.comentarios.push({
          nome: this.nome,
          opiniao: this.opiniao,
        });

        // Limpa os campos
        this.nome = "";
        this.opiniao = "";
      } else {
        alert("Por favor, preencha todos os campos!");
      }
    },
  },
};
</script>

<style scoped>
    /* Estilo Geral */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #f9f9f9;
  }

main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilo da Seção Sobre */
.sobre-secao {
  background: #fff;
  width: 90%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.titulo-sobre {
  font-size: 24px;
  color: #321a02;
  margin-bottom: 10px;
}

.descricao-sobre {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

/* Estilo da Seção Opiniões */
.opinioes-secao {
  background: #fff;
  width: 90%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.titulo-opinioes {
  font-size: 24px;
  color: #5c3203;
  text-align: center;
  margin-bottom: 20px;
}

.formulario-opiniao {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rotulo {
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
  max-width: 400px;
}

.entrada,
.entrada-texto {
  width: 100%;
  max-width: 400px;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.botao-enviar {
  background-color: #884e09;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.botao-enviar:hover {
  background-color: #5c3203;
}

.lista-opinioes {
  margin-top: 20px;
}

.titulo-comentarios {
  font-size: 18px;
  margin-bottom: 10px;
}

.lista-container {
  list-style: none;
  padding: 0;
}

.comentario {
  background: #eef6f2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
    /* --- Responsividade com @media --- */

    /* Smartphones (até 600px) */
    @media (max-width: 600px) {
      .sobre-secao,
      .opinioes-secao {
        width: 100%; /* Usa toda a largura disponível */
        padding: 15px; /* Ajusta o espaçamento interno */
      }

      .titulo-sobre,
      .titulo-opinioes {
        font-size: 20px; /* Reduz o tamanho do texto */
      }

      .descricao-sobre {
        font-size: 14px;
      }

      .entrada,
      .entrada-texto {
        font-size: 12px; /* Texto menor para dispositivos pequenos */
        padding: 8px; /* Ajusta o espaçamento interno */
      }

      .botao-enviar {
        font-size: 14px;
        padding: 8px 16px;
      }
    }

    /* Tablets (601px a 1024px) */
    @media (min-width: 601px) and (max-width: 1024px) {
      .sobre-secao,
      .opinioes-secao {
        width: 90%; /* Mantém o layout ajustado para tablets */
      }

      .titulo-sobre,
      .titulo-opinioes {
        font-size: 22px; /* Ajuste intermediário no tamanho do texto */
      }

      .descricao-sobre {
        font-size: 15px;
      }

      .entrada,
      .entrada-texto {
        font-size: 13px;
      }

      .botao-enviar {
        font-size: 15px;
      }
    }

    /* Desktops grandes (acima de 1024px) */
    @media (min-width: 1025px) {
      .sobre-secao,
      .opinioes-secao {
        max-width: 800px;
      }

      .titulo-sobre,
      .titulo-opinioes {
        font-size: 24px;
      }

      .descricao-sobre {
        font-size: 16px;
      }

      .entrada,
      .entrada-texto {
        font-size: 14px;
      }

      .botao-enviar {
        font-size: 16px;
      }
    }
</style>


