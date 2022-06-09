<script setup lang="ts">
import Values from './../../components/Home/Values.vue';
import Header from './../../components/Header.vue';
</script>

<template>
    <section>
        <Header :display="true" :banner="true" breadcrumb="à propos de nous"/>
        <Values />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Values',
  mounted() {
    this.signal.dispatch(['experience-end'])
  },
  methods: {
    
  }
})
</script>