<template>
  <section v-show="display" id="welcome" class="page welcome color--secondary">
    <div class="welcome--logo-container">
      <img src="../assets/img/logo_complet.svg" alt="">
    </div>
    <div class="welcome--arrow-container">
      <button @click="goTo" id="go-to-discover">
        <img src="../assets/img/decouvrir_fleche.svg" alt="">
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import MainScene from '../assets/js/webgl/main/MainScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WelcomePage',
  props: ['show','display'],
  emits: ['next'], 
  mounted () {
    
  },
  methods: {
    goTo() {
      this.$emit('next', 'toDiscover')      
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.welcome--logo-container {
  width: 50vw;
  margin: auto;
}
.welcome--arrow-container {
  height: 100px;
  width: 100px;
  transform: rotate(-90deg);
  border-radius: 50%;
  margin: 0 auto 30px;
}
.welcome--arrow-container img {
  transform: rotate(90deg);
}
</style>