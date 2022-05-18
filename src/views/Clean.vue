<script setup lang="ts">
import Canvas from './../components/Canvas.vue';
import Draggable from './../components/Draggable.vue';
import Breadcrumb from './../components/Breadcrumb.vue';
import Progress from './../components/Progress.vue';
import Scoreboard from './../components/Scoreboard.vue';
import Header from './../components/Header.vue';
import Loading from './../components/Loading.vue';
import Slide from './../components/Slide.vue';
import Values from './../components/Values.vue';
import Welcome from './../components/Welcome.vue';
import Actions from './../components/Actions.vue';
import Discover from './../components/Discover.vue';
</script>

<template>
  <nav class="nav page-full color--primary" style="display: none">
    <div class="nav--main">
      <div class="nav--logo">
        <button @click="goTo" class="nav--link">
          <img src="../assets/img/logo_texte.svg" alt="">
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* nav */
.nav {
  pointer-events: none;
  z-index: 1;
}
.nav--main {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 97%;
  border-right: 1px solid currentColor;
  z-index: 1;
  margin-top: 3%;
}
.nav--logo {
  width: 100%;
  padding: 10px 30px 10px 10px;
  position: absolute;
  right: 0;
  transform: translate(100%, 0);
}
.nav--text-container {
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
.nav--text-upper {
  text-transform: uppercase;
  white-space: nowrap;
}
.nav--link {
  width: 100%; 
  height: 100%;
  pointer-events: all;
}
</style>