<template>
  <div class="slider">
    <header class="page header">
      <div class="banner--container color--primary">
        <div class="banner--text">
          <p>Achetez notre produit et retrouvez votre vigueur d'antan - CODE PROMO -2% JESAUVELAPLANETE</p>
        </div>
      </div>
      <div v-if="banner != false" class="banner--container color--secondary">
        <div class="header--text-upper">
          <p>protégeons notre planète &nbsp;&nbsp;&nbsp;&nbsp; protégeons notre planète   protégeons notre planète &nbsp;&nbsp;&nbsp;&nbsp; protégeons notre planète &nbsp;&nbsp;&nbsp;&nbsp; protégeons notre planète protégeons notre planète &nbsp;&nbsp;&nbsp;&nbsp; protégeons notre planète &nbsp;&nbsp;&nbsp;&nbsp; protégeons notre planète </p>
        </div>
      </div>
      <div class="header--main">
        <div class="header--logo">
          <a href="/" class="header--link">
            <img src="./../../assets/img/logo_texte.svg" alt="">
          </a>
        </div>
        <div class="header--text-container">
          <h4 class="header--text">Nos produits</h4>
        </div>
      </div>
    </header>
    <section v-if="display" id="slide" class="page slider color--secondary">
      <div class="container-fluid">
        <div class="row h-100">
          <div class="col-12 col-lg-4 h-lg-100">
            <div v-if="this.index == 0" class="slider--content-container">
              <h2 class="slider--title decoration">Les flocons</h2>
              <h3 class="slider--subtitle">Vitalité</h3>
              <p class="slider--text"> Coup de boost immédiat les flocons de cartilage réduisent la fatigue maintiennent l'énergie dans la durée, favorisent le désir et la libido, retrouvez l'énergie et la vivacité d’un grand requin marteau.</p>
              <button @click="goTo" href="#" class="">
                <div class="btn btn--primary">
                  <span>En savoir plus</span>
                </div>
              </button>
            </div>
            <div v-else-if="this.index == 1" class="slider--content-container">
              <h2 class="slider--title decoration">L'huile</h2>
              <h3 class="slider--subtitle">Force</h3>
              <p class="slider--text">Cette huole à base d'aileron de roussette résout les problèmes de mémoire. Il la stimule en favorisant le ralentissement du vieillissemet cérébral et en augmentant les capacités de concentration et de mémorisation</p>
              <button @click="goTo" href="#" class="">
                <div class="btn btn--primary">
                  <span>En savoir plus</span>
                </div>
              </button>
            </div>
            <div v-else-if="this.index == 2" class="slider--content-container">
              <h2 class="slider--title decoration">Le bouillon</h2>
              <h3 class="slider--subtitle">Force</h3>
              <p class="slider--text">Le complexe synergique du bouillon issu de l'aileron du requin blanc permet de préserver une bonnae santé osseuse. Il contribue à une bonne circulation du sang pour réduire durablement les sensations de douleurs articulaires ! </p>
              <button @click="goTo" href="#" class="">
                <div class="btn btn--primary">
                  <span>En savoir plus</span>
                </div>
              </button>
            </div>
          </div>
          <div class="col-12 col-lg-7 h-lg-100">
            <div class="slider--canvas-container">
              <canvas></canvas>
              <button @click="slidePrev" id="prev" class="slider--arrow-prev"></button>
              <button @click="slideNext" id="next" class="slider--arrow-next"></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlidePage',
  props: ['display', 'index'],
  emits: ['next', 'slide'], 
  mounted () {
    
  },
  methods: {
    goTo() {
      this.$emit('next', 'toValues')      
    },
    slideNext() {
      this.$emit('slide', 'next')
    },
    slidePrev() {
      this.$emit('slide', 'prev')
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.slider {
  position: relative;
}
.slider header {
  position: absolute;
}
.slider--content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}

.slider--text {
  margin: 30px 0;
}

.decoration {
  position: relative;
}
.slider--title.decoration::before {
  content: "";
  width: 10px;
  height: 10px;
  border: 1px solid var(--color-primary);
  background-color: var(--color-primary);
  border-radius: 50%;
  position: absolute;
  left: -30px;
  top: 9px;
}
.slider--title.decoration::after {
  content: "";
  width: 10px;
  height: 10px;
  border: 1px solid var(--color-primary);
  background-color: transparent;
  border-radius: 50%;
  position: absolute;
  left: -30px;
  top: 24px;
}

.slider--arrow-prev {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-primary);
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
}
.slider--arrow-next {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  top: 50%;
  border: 1px solid var(--color-primary);
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
}
.slider--canvas-container {
  height: 100%;
  width: 100%;
}
canvas {
  height: 100%;
  width: 100%;
  border: 1px solid red;
}
/* HEADER */
header {
  pointer-events: none;
  z-index: 1;
}
.header--main {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 97%;
  border-right: 1px solid currentColor;
  z-index: 1;
  margin-top: 3%;
}
.header--logo {
  width: 100%;
  padding: 10px 30px 10px 10px;
  position: absolute;
  right: 0;
  transform: translate(100%, 0);
}
.header--text-container {
  white-space: nowrap;
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(31%, 100%) rotate(-90deg);
}
.banner--container {
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  border-bottom: 2px solid currentColor;
  padding: 5px 0;
}
.header--text {
  font-size: .5em;
}
.header--text-upper {
  text-transform: uppercase;
  white-space: nowrap;
}
.header--link {
  width: 100%; 
  height: 100%;
  pointer-events: all;
}
</style>
