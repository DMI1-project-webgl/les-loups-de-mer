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
          <img src="" alt="">
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
.food--btn-text {
  color: white;
  font-size: .5em;
  padding: 5px 0;
  text-align: center;
  white-space: nowrap;
}
</style>