<script setup lang="ts">
</script>

<template>
  <!-- ALL ROUTES -->
  <!-- <div class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/clean">Clean</router-link>
    <router-link to="/greenery">Greenery</router-link>
    <router-link to="/food">Food</router-link>
    <router-link to="/result">Result</router-link>
    <router-link to="/shop">Shop</router-link>
    <router-link to="/newsletter">Newsletter</router-link>
  </div> -->

  <!-- 3D COMPONENT  -->
  <!-- <Canvas /> -->
  <!-- <Draggable /> -->
  <!-- <Breadcrumb step="1"/> -->
  
  <!-- <Scoreboard nbBottle="3" maxBottle="3" nbTrash="3" maxTrash="3" nbCan="0" maxCan="3" nbButt="0" maxButt="3" nbPlastic="3" maxPlastic="3"/> -->

  <router-view />
</template>

<style>
@import './assets/base.css';
@import './assets/grid.min.css';

header {
  z-index: 10;
}

.nav {
  z-index: 10;
}
</style>
