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

<script lang="ts">
  var Show = {
    header: false,
    banner: true,
    welcome: true,
    discover: false,
    loading: false,
    slide: false,
    slideIndex: 1,
    values: false,
    actions: false,
  };

  // console.log(Show.slideIndex)
</script>

<template>
  <Header :display="Show.header" :banner="Show.banner"/>
  <Welcome :display="Show.welcome"/>
  <Loading :display="Show.loading"/>
  <Slide :display="Show.slide" :index="Show.slideIndex"/>
  <Values :display="Show.values"/>
  <Actions :display="Show.actions"/>
  <Discover :display="Show.discover"/>
  
  <!-- <section class="page color--secondary">

    <div class="container" style="borde: 2px solid green;">
      <div class="row" style="borde: 2px solid blue;">
        <div class="col-12 col-md-4 col-lg-2" style="borde: 2px solid red;">
          <h1>koukou</h1>
        </div>
      </div>
    </div>
  </section> -->
  
</template>


