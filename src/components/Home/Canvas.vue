<template>
  <div class="canvas" ref="container">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import HomeApp from './../../assets/js/webgl/main/HomeApp'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasElement',
  data() {
    return {
      homeApp: null
    };
  },
  watch:{
    $route (to, from) {
      const pageName = to.name.toLowerCase()
      switch (pageName) {
              case 'greenery':
              case 'food':
                if (!this.homeApp) this.$router.push('clean')
                break
            default:
              if (this.homeApp) this.homeApp.destroy(); this.homeApp = null
        }
      if (this.homeApp) this.homeApp.changeState(['route-' + pageName])
    }
  },
  mounted () {
    this.homeApp = new HomeApp(this.$refs['canvas'] as HTMLCanvasElement, this.signal, this.$refs.container)
  },
  beforeDestroy () {
    if (this.homeApp) this.homeApp.destroy()
  }
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
