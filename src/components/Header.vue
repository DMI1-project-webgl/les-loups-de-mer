<template>
  <header v-if="display" id="1" class="page header">
    <div v-if="banner" class="banner--container color--primary">
      <div class="banner--text">
        <p>test</p>
      </div>
    </div>
    <div v-if="banner != false" class="banner--container color--secondary">
      <div class="banner--text">
        <p>test</p>
      </div>
    </div>
    <div class="header--main">
      <div class="header--logo">
        <a href="/" class="header--link">
          <img src="../assets/img/logo_texte.svg" alt="">
        </a>
      </div>
      <div class="header--text-container">
        <h4 class="header--text">Nos produits</h4>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import HomeScene from '../assets/js/webgl/main/HomeScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderElement',
  props: ['display', 'banner'],
  mounted () {
      
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
/* HEADER */
header {
  pointer-events: none;
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
}
.header--text {
  text-transform: uppercase;
}
.header--link {
  width: 100%; 
  height: 100%;
  pointer-events: all;
}
</style>