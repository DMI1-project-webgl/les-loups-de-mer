<script setup lang="ts">
import Canvas from './components/Canvas.vue';
</script>

<template>
  <header>
    <h1>Les loups de mer</h1>
  </header>

  <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/clean">Clean</router-link>
      <router-link to="/greenery">Greenery</router-link>
      <router-link to="/food">Food</router-link>
      <router-link to="/result">Result</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/newsletter">Newsletter</router-link>
  </div>

  <Canvas />

  <router-view />
</template>

<style>
@import './assets/base.css';

header {
  z-index: 10;
}

.nav {
  z-index: 10;
}

.nav a {
  margin: 10px;
}
</style>
