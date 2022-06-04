<template>
  <div class="canvas" ref="container">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasElement',
  data() {
    return {
      homeApp: null
    };
  },
  mounted () {
  },
})
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
}

canvas#canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
