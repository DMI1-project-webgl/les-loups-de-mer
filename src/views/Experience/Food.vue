<script setup lang="ts">
import Draggable from './../../components/Experience/Draggable.vue';
import Modal from '../../components/Experience/Modal.vue';
</script>

<template>
  <Draggable @valueChange="updateNumberFish" />
  <Modal v-if="tuto1" text="Parfait, c’est vraiment beau, vous êtes très doué.e ! Il ne manque plus que l’alimentation. Le requin mange jusqu’à 15 kilos de viande par semaine, les loups de mer ont donc pris soin de mettre à disposition de ce magnifique animal tout ce dont il aura besoin. " @showoff="hidetuto1"/>
  <Modal v-if="tuto2" text="Utilisez la jauge pour ajouter des petits poissons qui serviront d’alimentation à notre requin, une fois que vous pensez avoir bien dosé, validez votre choix. " @showoff="hidetuto2"/>
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
    }
  }
})
</script>
