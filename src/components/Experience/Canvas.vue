<template>
  <div class="canvas">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import HomeApp from './../../assets/js/webgl/main/HomeApp'
import ExperienceApp from './../../assets/js/webgl/main/ExperienceApp'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasElement',
  data() {
    return {
      homeApp: null,
      experienceApp: null
    };
  },
  watch:{
    $route (to, from) {
      const pageName = to.name.toLowerCase()
      switch (pageName) {
            case 'home':
              if (this.experienceApp) this.experienceApp.destroy(); this.experienceApp = null
              this.homeApp = new HomeApp(this.$refs['canvas'] as HTMLCanvasElement)
                break
            case 'clean':
              if (this.homeApp) this.homeApp.destroy(); this.homeApp = null
              this.experienceApp = new ExperienceApp(this.$refs['canvas'] as HTMLCanvasElement)
                break
              case 'greenery':
              case 'food':
                if (this.homeApp) this.homeApp.destroy(); this.homeApp = null
                if (!this.experienceApp) this.$router.push('clean')
                break
            default:
              if (this.homeApp) this.homeApp.destroy(); this.homeApp = null
              if (this.experienceApp) this.experienceApp.destroy(); this.experienceApp = null
        }

      if (this.homeApp) this.homeApp.changeState(['route-' + pageName])
      if (this.experienceApp) this.experienceApp.changeState(['route-' + pageName])
    }
  },
  beforeDestroy () {
    if (this.homeApp) this.homeApp.destroy()
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
