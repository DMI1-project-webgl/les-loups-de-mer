<script setup lang="ts">
import AudioController from './components/AudioController.vue';
</script>

<template>
  <!-- ALL ROUTES -->
  <div>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/valeurs">Values</router-link>
      <router-link to="/actions">Actions</router-link>
      <router-link to="/clean">Clean</router-link>
      <router-link to="/greenery">Greenery</router-link>
      <router-link to="/food">Food</router-link>
      <router-link to="/result">Result</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/newsletter">Newsletter</router-link>
    </div>
    <AudioController />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition> 
      </router-view>
    </main>
  </div>
</template>

<style>
@import './assets/base.css';
@import './assets/grid.min.css';

header {
  z-index: 10;
}

.nav {
  z-index: 10;
  position: fixed;
  top: 20px;
  left: 100px;
  font-size: 15px;
}

.nav a {
  margin: 10px;
}


.fade-enter-active {
  opacity: 0;
  transition-duration: 0.3s;
  transition-delay: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-active {
  opacity: 1;
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
