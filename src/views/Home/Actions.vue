<script setup lang="ts">
import Actions from './../../components/Home/Actions.vue';
import Header from './../../components/Header.vue';
</script>

<template>
    <section>
        <Header :display="true" :banner="true"/>
        <Actions/>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Actions',
  mounted() {
    this.signal.dispatch(['experience-end'])
  },
  methods: {
    
  }
})
</script>