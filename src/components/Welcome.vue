<template>
  <section v-show="display" id="welcome" class="page welcome color--secondary">
    <div class="welcome--logo-container">
      <img src="../assets/img/logo_complet.svg" alt="">
    </div>
    <div class="welcome--arrow-container">
      <a href="#discover" id="go-to-discover">
        <img src="../assets/img/decouvrir_fleche.svg" alt="">
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import HomeScene from '../assets/js/webgl/main/HomeScene'
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
  height: 15vh;
  width: 15vh;
  transform: rotate(-90deg);
  border-radius: 50%;
  margin: 0 auto 5%;
}
.welcome--arrow-container img {
  transform: rotate(90deg);
}
</style>