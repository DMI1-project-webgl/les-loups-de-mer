<template>
  <div class="canvas">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import App1 from '../assets/js/webgl/main/App1'
import App2 from '../assets/js/webgl/main/App2'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasElement',
  data() {
    return {
      app1: null,
      app2: null
    };
  },
  watch:{
    $route (to, from) {
      const pageName = to.name.toLowerCase()
      switch (pageName) {
            case 'home':
              if (this.app2) this.app2.destroy()
              this.app1 = new App1(this.$refs['canvas'] as HTMLCanvasElement)
                break
            case 'clean':
              if (this.app1) this.app1.destroy()
              this.app2 = new App2(this.$refs['canvas'] as HTMLCanvasElement)
                break
              case 'greenery':
              case 'food':
                if (this.app1) this.app1.destroy()
                break
            default:
              if (this.app1) this.app1.destroy()
              if (this.app2) this.app2.destroy()
        }

      if (this.app1) this.app1.changeState(['route-' + pageName])
      if (this.app2) this.app2.changeState(['route-' + pageName])
    }
  },
  beforeDestroy () {
    if (this.app1) this.app1.destroy()
    if (this.app2) this.app2.destroy()
  }
})
</script>

<style scoped>
.canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

canvas#canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
