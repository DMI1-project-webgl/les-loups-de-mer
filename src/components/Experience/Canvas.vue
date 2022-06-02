<template>
  <div class="canvas">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import ExperienceApp from './../../assets/js/webgl/main/ExperienceApp'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasElement',
  created() {
    this.$router.push('clean')
  },
  mounted () {
    this.experienceApp = new ExperienceApp(this.$refs['canvas'] as HTMLCanvasElement, this.signal)
  },
  data() {
    return {
      experienceApp: null as ExperienceApp
    };
  },
  watch:{
    $route (to, from) {
      const pageName = to.name.toLowerCase()

      switch (pageName) {
              case 'clean':
              case 'greenery':
              case 'food':
              case 'result':
                if (!this.experienceApp) this.$router.push('clean')
                break
            default:
              if (this.experienceApp) this.experienceApp.destroy(); this.experienceApp = null
      }
    }
  },
  beforeDestroy () {
    if (this.experienceApp) this.experienceApp.destroy()
  }
})
</script>

<style scoped>
.canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.canvas--left {
  transform: translateX(-22%);
}

canvas#canvas {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform 3s cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
