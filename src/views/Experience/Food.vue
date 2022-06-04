<script setup lang="ts">
import Draggable from './../../components/Experience/Draggable.vue';
import Modal from '../../components/Experience/Modal.vue';
</script>

<template>
  <div class="food-container">
    <Draggable @valueChange="updateNumberFish" :tuto="tuto2"/>
    <Modal v-if="tuto1" text="Parfait, c’est vraiment beau, vous êtes très doué.e ! Il ne manque plus que l’alimentation. Le requin mange jusqu’à 15 kilos de viande par semaine, les loups de mer ont donc pris soin de mettre à disposition de ce magnifique animal tout ce dont il aura besoin. " @showoff="hidetuto1" :showbtn="true"/>
    <Modal v-if="tuto2" text="Utilisez la jauge pour ajouter des petits poissons qui serviront d’alimentation à notre requin, une fois que vous pensez avoir bien dosé, validez votre choix. " @showoff="hidetuto2" :showbtn="true"/>
      <div class="food--btn-container" @click="validateStep" >
        <div class="food--btn">
          <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <path d="M123.65,0c5.13,1.47,9.31,4.12,10.97,9.51,1.75,5.67,.25,10.54-3.92,14.71-15.82,15.8-31.63,31.63-47.44,47.45-.74,.74-1.44,1.51-2.56,2.7,1.53,.07,2.54,.16,3.56,.16,23.15,0,46.29-.05,69.44,.02,51.95,.14,96,34,109.58,84.14,15.11,55.81-16.7,115.87-71.34,134.72-9.36,3.23-18.92,5.41-28.82,6.05-.86,.06-1.7,.36-2.55,.55h-48.64c-2.16-1.41-4.79-2.42-6.4-4.31-4.24-4.98-3.92-10.95-1.78-16.58,2-5.26,6.65-6.98,12.09-6.97,13.67,.02,27.35,.19,41.01-.12,40.31-.92,74.64-30.93,81.2-70.76,7.72-46.94-24.33-91.18-71.16-98.06-4.42-.65-8.95-.84-13.42-.86-23.24-.08-46.48-.04-69.72-.03-.77,0-1.54,.07-3,.14,1,1.09,1.64,1.84,2.33,2.54,15.81,15.82,31.61,31.64,47.45,47.43,3.88,3.87,5.72,8.36,4.36,13.8-2.52,10.09-14.68,13.9-22.57,7.12-.81-.7-1.55-1.48-2.31-2.24-23.82-23.82-47.65-47.64-71.47-71.46-7.43-7.43-7.42-14.99,.01-22.42C61.61,54.14,84.7,31.1,107.72,8c3.32-3.33,6.59-6.6,11.24-8h4.69Z" style="fill:#1f3666;"/>
          </svg>
        </div>
        <p class="food--btn-text">Valider</p>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => {
    return {
      value: 0,
      tuto1: true,
      tuto2: false,
    }
  },
  mounted () {
    this.signal.add(this.onSignal.bind(this))
  },
  methods: {
    updateNumberFish (value: number) {
      this.signal.dispatch(['numberFish', value])
    },
    hidetuto1() {
      this.tuto1 = false;
      this.tuto2 = true;
    },
    hidetuto2() {
      this.tuto2 = false;
    },
    onSignal(slug: Array<string|number>) {
      switch(slug[0]) {
        case 'next-step':
          this.$router.push('result')
      }
    },
    validateStep() {
      this.signal.dispatch(['validate-tapped'])
    },
  }
})
</script>

<style scoped>
.food-container {
  width: 100vw;
  height: 100vh;
  top: 0;
  position: fixed;
}
.food--btn-container {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(-50%, -50%);
}
.food--btn {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
}
.food--btn svg {
  position: absolute;
  width: 25px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.food--btn-text {
  color: white;
  font-size: .5em;
  padding: 5px 0;
  text-align: center;
  white-space: nowrap;
}
</style>