<template>
  <section v-if="display" id="slide-1" class="page slider color--secondary">
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-12 col-lg-4 h-lg-100">
          <div v-if="index == 0" class="slider--content-container">
            <h2 class="slider--title decoration">Les Flocons</h2>
            <h3 class="slider--subtitle">Vitalité</h3>
            <p class="slider--text">Coup de boost immédiat les flocons de cartilage réduisent la fatigue, maintiennet l'énergie dans la durée, favorisent le désir et la libido. Retrouvez l'énergie et la vivacité d'un grand requin marteau</p>
          </div>
          <div v-if="index == 1" class="slider--content-container">
            <h2 class="slider--title decoration">Les Flo cons</h2>
            <h3 class="slider--subtitle">Rivalité</h3>
            <p class="slider--text">Coup de boost immédiat les flocons de cartilage réduisent la fatigue, maintiennet l'énergie dans la durée, favorisent le désir et la libido. Retrouvez l'énergie et la vivacité d'un grand requin marteau</p>
            <a href="#" class="">
              <div class="btn btn--primary">
                <span>En savoir plus</span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-12 col-lg-7 h-lg-100">
          <div class="slider--canvas-container">
            <canvas></canvas>
            <div class="slider--arrow-prev"></div>
            <div class="slider--arrow-next"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import MainScene from '../assets/js/webgl/main/MainScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlidePage',
  props: ['display', 'index'],
  mounted () {
  
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
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
</style>
