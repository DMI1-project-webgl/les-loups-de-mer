<script setup lang="ts">
import Nav from './../../components/Nav.vue';
import Canvas from './.././../components/Experience/Canvas.vue';
import Advancement from './../../components/Experience/Advancement.vue';
import BackgroundGradient from '../../components/BackgroundGradient.vue';
import Loader from '../../components/Experience/Loader.vue';
</script>

<template>
  <div>
    <BackgroundGradient />
    <Canvas />
    <Nav />
    <Loader />
    <Advancement v-if="showAdvancement" />
    <button class="validate-button" @click="validate">Validate step</button>
    <router-view />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Experience',
  data() {
    return {
      showAdvancement: true
    }
  },
  mounted () {
    this.signal.add(this.onSignal.bind(this))
    this.signal.dispatch(['experience-start'])
  }, 
  methods: {
    onSignal(slug: string[]) {
      if(slug[0] === 'experience-end') {
        this.showAdvancement = false
      }
    },
    validate() {
        this.signal.dispatch(['validate-tapped'])
    },
  },
  beforeDestroy () {
  },
})
</script>

<style scoped>
.validate-button {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  margin: 40px;
  font-size: 0.6rem;
  width: min-content;
  height: min-content;
  background-color: #F00;
}
</style>