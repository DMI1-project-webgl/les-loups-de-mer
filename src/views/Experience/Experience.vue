<script setup lang="ts">
import Canvas from './../../components/Canvas.vue';
import Draggable from './../../components/Draggable.vue';
import Breadcrumb from './../../components/Breadcrumb.vue';
import Progress from './../../components/Progress.vue';
import Scoreboard from './../../components/Scoreboard.vue';
import Header from './../../components/Header.vue';
import Loading from './../../components/Loading.vue';
import Slide from './../../components/Slide.vue';
import Nav from './../../components/Nav.vue';
</script>

<template>
  <Canvas />
  <Nav />
  <!-- Row props: 
    <Breadcrumb step="2"/> 
  --> 
  <router-view />
</template>