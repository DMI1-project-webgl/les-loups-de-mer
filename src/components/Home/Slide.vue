<template>
  <div class="slider">
    <header class="page header">
      <div class="banner--container color--primary">
        <div class="banner--text">
          <p>Achetez notre produit et retrouvez votre vigueur d'antan - CODE PROMO -2% JESAUVELAPLANETE</p>
        </div>
      </div>
      <div class="banner--container color--secondary">
        <div class="header--text-upper">
          <span v-for="index in 8" :key="index">
            protégeons notre planète
          </span>
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
    <section id="slide" class="page slider color--secondary">
      <div class="container-fluid">
        <div class="row h-100">
          <div class="col-12 col-lg-4 h-lg-100">
            <div v-if="index == 0" class="slider--content-container">
              <h2 class="slider--title decoration">Les flocons</h2>
              <h3 class="slider--subtitle">Vitalité</h3>
              <p class="slider--text"> Coup de boost immédiat les flocons de cartilage réduisent la fatigue maintiennent l'énergie dans la durée, favorisent le désir et la libido, retrouvez l'énergie et la vivacité d’un grand requin marteau.</p>
              <SquaredButton :isRouterLink="true" link="/valeurs" text="En savoir plus"/>
            </div>
            <div v-else-if="index == 1" class="slider--content-container">
              <h2 class="slider--title decoration">L'huile</h2>
              <h3 class="slider--subtitle">Force</h3>
              <p class="slider--text">Cette huole à base d'aileron de roussette résout les problèmes de mémoire. Il la stimule en favorisant le ralentissement du vieillissemet cérébral et en augmentant les capacités de concentration et de mémorisation</p>
              <SquaredButton :isRouterLink="true" link="/valeurs" text="En savoir plus"/>
            </div>
            <div v-else-if="index == 2" class="slider--content-container">
              <h2 class="slider--title decoration">Le bouillon</h2>
              <h3 class="slider--subtitle">Force</h3>
              <p class="slider--text">Le complexe synergique du bouillon issu de l'aileron du requin blanc permet de préserver une bonnae santé osseuse. Il contribue à une bonne circulation du sang pour réduire durablement les sensations de douleurs articulaires ! </p>
              <SquaredButton :isRouterLink="true" link="/valeurs" text="En savoir plus"/>
            </div>
          </div>
          <div class="col-12 col-lg-7 h-lg-100">
            <div class="slider--canvas-container">
              <div class="elements-slider">
                <img v-if="index == 2" src="@/assets/img/slider/bouillon.png" class="element-slider">
                <img v-if="index == 0" src="@/assets/img/slider/epices.png" class="element-slider">
                <img v-if="index == 1" src="@/assets/img/slider/huile.png" class="element-slider">
              </div>
              <button @click="slidePrev" id="prev" class="slider--arrow-prev slider--arrow"><img src="./../../assets/img/arrow.svg" alt=""></button>
              <button @click="slideNext" id="next" class="slider--arrow-next slider--arrow"><img src="./../../assets/img/arrow.svg" alt=""></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Canvas from './Canvas.vue'
import SquaredButton from '../UI/SquaredButton.vue'

export default defineComponent({
    name: "SlidePage",
    props: ["index"],
    emits: ["slide"],
    mounted() {
    },
    methods: {
        slideNext() {
            this.$emit("slide", "next");
        },
        slidePrev() {
            this.$emit("slide", "prev");
        }
    },
    beforeDestroy() {
    },
    components: { Canvas, SquaredButton }
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
  align-items: flex-start;
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
  content: "*";
  font-size: 3rem;
  position: absolute;
  left: -30px;
  top: 9px;
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
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.slider--arrow-prev img {
  width: 15px;
  transform: rotate(90deg);
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
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.slider--arrow-next img {
  width: 15px;
  transform: rotate(-90deg);
}
.slider--canvas-container {
  height: 100%;
  width: 100%;
  margin-left: 5%;
}

.slider--arrow::before {
  position: absolute;
  content: '';
  width: 50px;
  height: 50px;
  transform: scale(0);
  left: -1px;
  top: -1px;
  background: var(--color-primary);
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.slider--arrow:hover:before {
  transform: scale(1);
}

.slider--arrow:hover img {
  filter: brightness(0) invert(1);
}

.slider--arrow:hover {
  transform: scale(1.15) translate(0, -44%);
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
.elements-slider {
  width: 100%;
  height: 100%;
  position: relative;
}

.element-slider {
  width: 120%;
  height: 100%;
  position: absolute;
  inset: 0;
  left: -10%;
  object-fit: contain;
}


.banner--container {
  border-top: 2px solid var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  padding: 6px 0 4px 0;
  width: 100%;
  overflow: hidden;
}
.header--text-upper {
  font-family: "leaguespartan";
  font-size: 0.5em;
  font-weight: 400;
  line-height: 1em;
  width: 200%;
  margin-left: 16px;
  display: flex;
  justify-content: space-between;
  animation: marquee 50s linear infinite;
  white-space: nowrap;
}

.header--text-upper span {
  display: block;
  width: 25%;
}

@keyframes marquee {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}

</style>
