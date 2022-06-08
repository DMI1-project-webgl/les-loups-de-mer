<script setup lang="ts">
import Draggable from './../../components/Experience/Draggable.vue';
import Modal from '../../components/Experience/Modal.vue';
import TutoGlobal from '../../components/Experience/TutoGlobal.vue';
</script>

<template>
  <div class="food-container">
    <Draggable @valueChange="updateNumberFish" :tuto="tuto1"/>
    <Modal v-if="tuto1" :classlist="tuto1Class" text="Utilisez la jauge pour ajouter des petits poissons qui serviront d’alimentation à notre requin, une fois que vous pensez avoir bien dosé, validez votre choix. " @showoff="hidetuto1" :showbtn="false"/>
      <div ref="validate" class="food--btn-container" @click="validateStep" >
        <div class="food--btn">
          <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <path d="M141,300c-5.58,0-10.82-2.85-13.84-7.64L43.8,160.09c-4.82-7.65-2.53-17.75,5.12-22.57,7.64-4.82,17.75-2.53,22.57,5.12l65.86,104.5L227.06,10.57c3.2-8.45,12.65-12.7,21.1-9.5,8.45,3.2,12.7,12.65,9.5,21.1l-101.35,267.27c-2.2,5.8-7.49,9.86-13.67,10.48-.55,.05-1.09,.08-1.64,.08Z" style="fill:#1f3666;"/>
          </svg>
        </div>
        <p class="food--btn-text">Valider</p>
      </div>
      <TutoGlobal :alreadyOpen="false" :texts="[
        'Parfait, c’est vraiment beau, vous êtes très doué.e ! Il ne manque plus que l’alimentation.', 
        'Le requin mange jusqu’à 15 kilos de viande par semaine, les loups de mer ont donc pris soin de mettre à disposition de ce magnifique animal tout ce dont il aura besoin. '
        ]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => {
    return {
      value: 0,
      tuto1: false,
      tuto1Class: ''
    }
  },
  mounted () {
    this.signal.add(this.onSignal.bind(this))
    this.signal.dispatch(['success'])
  },
  methods: {
    updateNumberFish (value: number) {
      this.signal.dispatch(['numberFish', value])
    },
    hidetuto1() {
      // this.tuto1 = false;
      this.tuto1Class = "modal-disable";
      setTimeout(() => {
        this.tuto1 = false
        this.signal.dispatch(['none-tuto-modal'])
      }, 300)
      if (!this.$refs.validate) return
      (this.$refs.validate as HTMLElement).classList.add("food--btn-container--valide")
    },
    onSignal(slug: Array<string|number>) {
      switch(slug[0]) {
        case 'next-step':
          this.$router.push('result')
        case 'begin-tuto':
          this.tuto1 = true
          break
        case 'numberFish':
          this.hidetuto1()
      }
    },
    validateStep() {
      this.signal.dispatch(['click-general'])
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
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease-out;
}

.food--btn-container--valide {
  opacity: 1;
  pointer-events: all;
  cursor: pointer;
}

.food--btn {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background-color: var(--color-tertiary);
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
  color: var(--color-tertiary);
  font-size: .5em;
  padding: 5px 0;
  text-align: center;
  white-space: nowrap;
}
</style>