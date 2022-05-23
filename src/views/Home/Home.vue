<script setup lang="ts">
// Home
import Header from './../../components/Header.vue';
import Slide from './../../components/Home/Slide.vue';
import Welcome from './../../components/Home/Welcome.vue';
import Discover from './../../components/Home/Discover.vue';
import Loading from './../../components/Home/Loading.vue';
import Sound from './../../components/Sound.vue';
</script>

<template>
  <Loading :display="this.show.loading"/>
  <Header :display="this.show.header" :banner="this.show.banner"/>
  <Welcome />
  <Discover/>
  <Slide :index="this.slideIndex" @slide="slideTo"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {  
      show: {
        header: false,
        banner: true,
        loading: false
      },
      slideIndex: 0
    }
  },
  mounted () {
  },
  methods: {
    slideTo(to: string) {
      if (to == 'next') {
        this.slideIndex += 1;
        if(this.slideIndex > 2) {
          this.slideIndex = 0
        }
      }
      else if (to == 'prev') {
        this.slideIndex -= 1;
        if(this.slideIndex < 0) {
          this.slideIndex = 2
        }
      }
    },
  },
  beforeDestroy () {
  }
})
</script>

