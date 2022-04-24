<template>
  <div class="canvas">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import MainApp from '../assets/js/webgl/main/MainApp'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasElement',
  data() {
    return {
      app: null
    };
  },
  watch:{
    $route (to, from) {
      this.app.changeState('route-' + to.name.toLowerCase())
    }
  },
  mounted () {
    this.app = new MainApp(this.$refs['canvas'] as HTMLCanvasElement)
  },
  beforeDestroy () {
    this.app.destroy()
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
