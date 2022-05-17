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
  <Loading :display="this.Show.loading" @next="next" />
  <Header :display="this.Show.header" :banner="this.Show.banner" @next="next"/>
  <Welcome :display="this.Show.welcome" @next="next"/>
  <Discover  :display="this.Show.discover" @next="next"/>
  <Slide :display="this.Show.slide" :index="this.Show.slideIndex" @next="next" @slide="slideTo"/>
  <Values :display="this.Show.values" @next="next"/>
  <Actions :display="this.Show.actions" @next="next"/>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {  
      Show: {
        header: false,
        banner: true,
        welcome: true,
        discover: true,
        loading: false,
        slide: true,
        slideIndex: 0,
        values: false,
        actions: false,
      }
    }
  },
  mounted () {
  },
  methods: {
    slideTo(to: string) {
      console.log("slide to ")
      if (to == 'next') {
        this.Show.slideIndex += 1;
        if(this.Show.slideIndex > 2) {
          this.Show.slideIndex = 0
        }
      }
      else if (to == 'prev') {
        this.Show.slideIndex -= 1;
        if(this.Show.slideIndex < 0) {
          this.Show.slideIndex = 2
        }
      }
    },
    next(elem: string) {
      if (elem == 'toValues') {
        this.Show.slide = false;
        this.Show.welcome = false;
        this.Show.discover = false;
        this.Show.header = true;
        this.Show.values = true;
      }
      switch (elem) {
        case 'toValues': 
          this.Show.slide = false;
          this.Show.header = true;
          this.Show.values = true;
          break;
        case 'toActions': 
          this.Show.values = false;
          this.Show.header = true;
          this.Show.actions = true;
          break;
        default:
          this.Show.header = false;
          this.Show.banner = true;
          this.Show.welcome = true;
          this.Show.discover = false;
          this.Show.loading = false;
          this.Show.slide = false;
          this.Show.slideIndex = 1;
          this.Show.values = false;
          this.Show.actions = false;
          break;
      }
    }
  },
  beforeDestroy () {
  }
})
</script>

