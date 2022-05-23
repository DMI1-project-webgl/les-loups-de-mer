<script setup lang="ts">
import Nav from './../../components/Nav.vue';
import Canvas from './.././../components/Experience/Canvas.vue';
import Draggable from './../../components/Experience/Draggable.vue';
import Breadcrumb from './../../components/Experience/Breadcrumb.vue';
import Progress from './../../components/Experience/Progress.vue';
import Scoreboard from './../../components/Experience/Scoreboard.vue';
import Advancement from './../../components/Experience/Advancement.vue';
import BackgroundGradient from '../../components/BackgroundGradient.vue';
</script>

<template>
  <BackgroundGradient />
  <Canvas />
  <Nav />
  <!-- 
    components : 
    <Scoreboard />
    img aileron
    <Popup />
    Row props: 
      <Progress />
      <Breadcrumb step="1"/> 
      <Button />
  --> 
  <Advancement />
  <router-view />
</template>