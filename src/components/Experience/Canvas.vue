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
  data() {
    return {
      experienceApp: null
    };
  },
  watch:{
    $route (to, from) {
      const pageName = to.name.toLowerCase()
      switch (pageName) {
              case 'greenery':
              case 'food':
                if (!this.experienceApp) this.$router.push('clean')
                break
            default:
              if (this.experienceApp) this.experienceApp.destroy(); this.experienceApp = null
        }
      if (this.experienceApp) this.experienceApp.changeState(['route-' + pageName])
    }
  },
  mounted () {
    this.experienceApp = new ExperienceApp(this.$refs['canvas'] as HTMLCanvasElement, this.signal)
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

canvas#canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
