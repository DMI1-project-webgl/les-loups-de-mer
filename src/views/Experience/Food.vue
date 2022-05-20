<script setup lang="ts">
import Draggable from './../../components/Experience/Draggable.vue';
</script>

<template>
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
      this.signal.dispatch(['numberFish', value])
    }
  }
})
</script>
