<script setup lang="ts">
import Draggable from './../components/Draggable.vue';
</script>

<template>
  <h1>Food Page</h1>
  <Draggable @valueChange="updateNumberFish" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => {
    return {
      value: 0,
    }
  },
  mounted () {
  },
  methods: {
    updateNumberFish (value: number) {
      console.log(value)
    }
  }
})
</script>
