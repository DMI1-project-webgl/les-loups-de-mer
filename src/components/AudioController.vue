<template>
    <div>
      <audio ref="clickGeneral" src="./../../src/assets/sound/click-general.mp3" preload="metadata" type="audio/mpeg"></audio>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AudioController',
  mounted () {
      this.signal.add(this.onSignal.bind(this))
  },
  methods: {
    onSignal(slug: Array<string|number>) {
        switch (slug[0]) {
            case "click-general":
                (this.$refs.clickGeneral as HTMLAudioElement).play();
            break
        }
    }
  },
  beforeDestroy () {
  }
})
</script>