<template>
    <audio ref="audio" loop autoplay preload="metadata" id="audio" class="d-none" :src="file" type="audio/mpeg"></audio>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdvencementElement',
  props: ['file'],
  mounted () {
      const audio = this.$refs.audio;
      audio.play();
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>