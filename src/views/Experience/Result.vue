<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => {
    return {
    }
  },
  mounted () {
      const canvas = document.querySelector('#canvas');
      canvas.classList.add('canvas--left')
  },
  methods: {
  }
})
</script>