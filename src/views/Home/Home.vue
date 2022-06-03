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
  <section
      ref="scrollSections"
      class="toto"
      id="my-scrollbar"
      data-scrollbar
    >
      <div class="Home">
        <Loading :display="show.loading"/>
        <Header :display="show.header" :banner="show.banner"/>
        <Welcome :scrollBar="scrollBar"  @scrolldown="scrollDown" />
        <Discover :scrollBar="scrollBar"/>
        <Slide :index="slideIndex" @slide="slideTo"/>
      </div>
    </section>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll/index'

export default defineComponent({
  data() {
    return {  
      show: {
        header: false,
        banner: true,
        loading: false
      },
      slideIndex: 0,
      scrollBar: undefined
    }
  },
  mounted () {
    Scrollbar.use(OverscrollPlugin);
    this.scrollBar =  Scrollbar.init(this.$refs.scrollSections as any, {
      plugins: {
      overscroll: {
        effect: 'bounce',
          onScroll: undefined,
          damping: 0.2,
          maxOverscroll: 150,
          glowColor: '#87ceeb',
        }
      }
    })
  },
  methods: {
    scrollDown() {
      (this.$refs.scrollSections as HTMLElement).style.height = "100vh"
      this.scrollBar.update()
      document.querySelectorAll('.video-slider').forEach((video) => {
        (video as HTMLVideoElement).play();
      })
    },
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

<style scoped>
.toto {
  /* height: 100vh; */
  overflow: hidden; 
  outline: none;
}

html {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>