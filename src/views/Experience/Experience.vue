<script setup lang="ts">
import Nav from './../../components/Nav.vue';
import Canvas from './.././../components/Experience/Canvas.vue';
import Draggable from './../../components/Experience/Draggable.vue';
import Breadcrumb from './../../components/Experience/Breadcrumb.vue';
import Progress from './../../components/Experience/Progress.vue';
import Scoreboard from './../../components/Experience/Scoreboard.vue';
import Advancement from './../../components/Experience/Advancement.vue';
import BackgroundGradient from '../../components/BackgroundGradient.vue';
import Sound from './../../components/Sound.vue';
import Loader from '../../components/Experience/Loader.vue';
</script>

<template>
  <div>
    <BackgroundGradient />
    <Canvas />
    <Nav />
    <Loader />
    <Advancement />
    <Sound file="src/assets/sound/.mp3" />
    <router-view />
  </div>
</template>