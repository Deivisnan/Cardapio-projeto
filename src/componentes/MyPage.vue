<template>


  <div class="div-banner">
    <img class="banner" :src="require('@/assets/img/banner.jpg')" alt="logo" height="50">

  </div>
  <div class="page">
    <main class="d-flex justify-content-center align-items-center">
      <!-- Card do Carrossel -->
      <div class="card carousel-card">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block" :src="require('@/assets/img/acai.jpeg')" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block" :src="require('@/assets/img/batata.jpeg')" alt="Second slide">
            </div>
            <div class="carousel-item">
              <img class="d-block" :src="require('@/assets/img/pastel.jpeg')" alt="Third slide">
            </div>
          </div>
          <!-- Botões de navegação -->
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </main>

  </div>


  <section>

  <div class="mapa" >
    <div class="mapa">
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.475748721151!2d-38.35054804177044!3d-12.877101125329375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161677f934f7a3%3A0xbe03a1816188c9ba!2sResidencial%20Brisas%20de%20Itinga!5e0!3m2!1spt-BR!2sbr!4v1732039514815!5m2!1spt-BR!2sbr"
          width="700"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>


  </div>
  </section>

</template>

<script>
import { Carousel } from 'bootstrap';

export default {
  mounted() {
    const carouselElement = document.querySelector('#carouselExampleControls');
    new Carousel(carouselElement);
  }
};
</script>

<style scoped>

.banner{

  margin-top: 90px;
    background-image: url('@/assets/img/banner.jpg'); /* Caminho para a imagem */
    background-size: cover; /* Ajusta a imagem ao container sem distorcer */
    background-position: center; /* Centraliza a imagem */
    background-repeat: no-repeat; /* Evita repetições */
    width: 100%; /* Largura total */
   height: 300px;



}
.mapa {
  margin: 0 auto;          /* Centraliza horizontalmente */
  text-align: center;      /* Centraliza o conteúdo */
  max-width: 80%;          /* Define uma largura máxima */
  padding: 20px;           /* Adiciona espaçamento interno */
}
iframe {
  display: block;          /* Remove espaçamentos extras */
  margin: 0 auto;
}


.page {
  height: 100vh; /* Ocupa a altura total da viewport para centralização */
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-card {
  width: 700px; /* Largura do card */
  height: 700px; /* Altura do card */
  overflow: hidden; /* Esconde o excesso da imagem */
  border-radius: 8px; /* Bordas arredondadas para um estilo de card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para destacar o card */
}

.carousel-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cobre o espaço do card */
}

/* Tablets (601px a 1024px) */
@media (min-width: 601px) and (max-width: 1024px) {
  .banner {
    height: 300px; /* Ajusta a altura do banner */
  }

  .mapa {
    max-width: 90%; /* Define largura média */
    padding: 15px; /* Ajusta o espaçamento interno */
  }

  .carousel-card {
    width: 600px; /* Reduz largura */
    height: 500px; /* Ajusta a altura */
  }

  .carousel-inner img {
    object-fit: cover;
  }
}

/* Desktops grandes (acima de 1024px) */
@media (min-width: 1025px) {
  .banner {
    height: 350px; /* Mantém o tamanho padrão */
  }

  .mapa {
    max-width: 80%;
  }

  .carousel-card {
    width: 700px;
    height: 700px;
  }

  .carousel-inner img {
    object-fit: cover;
  }
}
</style>
